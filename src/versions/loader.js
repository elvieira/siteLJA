/**
 * Carregador e Validador Remoto de Versões da Comunidade (GitHub)
 * 
 * Busca dinamicamente os arquivos da pasta 'community/' no repositório de cada projeto:
 * - pt.json (Tradução e detalhes em Português)
 * - es.json (Tradução e detalhes em Espanhol)
 * - main.webp (ou .png/.jpg - Imagem principal/mockup)
 * - 01.webp, 02.webp, 03.webp, 04.webp (Fotos da galeria)
 * - GitHub Releases (Tags, changelog, instaladores para download)
 */

import { registeredVersions } from "./registry";



// Cache em memória durante a sessão
const memoryCache = new Map();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutos

/**
 * Converte cor HEX para RGBA para estilização dinâmica
 */
export function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(251, 191, 36, ${alpha})`;
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Helper para testar se uma URL de imagem existe (Rápido via HEAD request)
 */
async function checkImageUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Busca se a imagem webp existe
 */
async function findValidImage(baseUrl, nameBase) {
  const extensions = ["webp"]; // Exigência rigorosa: apenas .webp
  
  // Roda as verificações em paralelo
  const checks = extensions.map(async (ext) => {
    const url = `${baseUrl}/${nameBase}.${ext}`;
    const exists = await checkImageUrl(url);
    return { exists, url, ext };
  });

  const results = await Promise.all(checks);
  
  // Retorna a primeira que existir na ordem de preferência
  for (const ext of extensions) {
    const found = results.find(r => r.ext === ext && r.exists);
    if (found) return found.url;
  }
  return null;
}

/**
 * Busca e valida os dados de uma versão específica
 */
export async function loadCommunityVersion(versionConfig, forceRefresh = false) {
  const { slug, repo, branch = "main", folder = "community", color = "#FBBF24", stage = "Beta", platforms = ["linux", "mac", "windows"] } = versionConfig;

  // Verificar cache
  const cacheKey = `comm_ver_v5_${slug}`;
  if (!forceRefresh && memoryCache.has(cacheKey)) {
    const cached = memoryCache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
  }

  // Tentar carregar do sessionStorage
  if (!forceRefresh) {
    try {
      const stored = sessionStorage.getItem(cacheKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          memoryCache.set(cacheKey, parsed);
          return parsed.data;
        }
      }
    } catch {
      // Ignora erro de storage
    }
  }

  const cdnBaseUrl = `https://cdn.jsdelivr.net/gh/${repo}@${branch}/${folder}`;
  const rawBaseUrl = `https://raw.githubusercontent.com/${repo}/${branch}/${folder}`;

  let ptJson = null;
  let esJson = null;
  let mainImage = null;
  let galleryPhotos = [];
  let releases = [];
  let isRemote = false;

  // 1. Buscar pt.json e es.json (Rápido via CDN preferencialmente)
  try {
    const [ptRes, esRes] = await Promise.all([
      fetch(`${cdnBaseUrl}/pt.json`).catch(() => fetch(`${rawBaseUrl}/pt.json`)),
      fetch(`${cdnBaseUrl}/es.json`).catch(() => fetch(`${rawBaseUrl}/es.json`)),
    ]);

    if (ptRes && ptRes.ok && esRes && esRes.ok) {
      const ptData = await ptRes.json();
      const esData = await esRes.json();

      if (ptData && ptData.short_desc && esData && esData.short_desc) {
        ptJson = ptData;
        esJson = esData;
        isRemote = true;
      }
    }
  } catch (err) {
    console.warn(`[CommunityLoader] Repositório remoto de ${slug} inacessível.`);
  }

  // Se não tem arquivos no GitHub, a versão não existe / é inválida!
  if (!isRemote || !ptJson || !esJson) {
    return null;
  }

  // 2. Buscar Imagem Principal OBRIGATÓRIA (Extrema velocidade)
  const mainImgUrl = await findValidImage(cdnBaseUrl, "main");
  if (!mainImgUrl) {
    return null; // A imagem main.webp é estritamente obrigatória!
  }
  mainImage = mainImgUrl;

  // 5. Buscar Releases do GitHub (Também podemos buscar rápido)
  if (repo) {
    try {
      const relRes = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=10`);
      if (relRes.ok) {
        const relData = await relRes.json();
        if (Array.isArray(relData)) {
          releases = relData;
        }
      }
    } catch {
      // Ignora erro de releases
    }
  }

  // 6. Montar objeto validado inicial
  const latestRelease = releases.length > 0 ? releases[0] : null;
  const rawTag = latestRelease ? latestRelease.tag_name : (ptJson.version || "v1.0.0");
  const versionTag = stage && !rawTag.toLowerCase().includes(stage.toLowerCase())
    ? `${rawTag} (${stage})`
    : rawTag;

  const result = {
    slug,
    codename: ptJson.name || versionConfig.codename || slug.charAt(0).toUpperCase() + slug.slice(1),
    repo,
    branch,
    color,
    stage,
    platforms,
    isRemote,
    versionTag,
    rawTag,
    mainImage,
    galleryPhotos: [], // Inicialmente vazio
    releases,
    translations: {
      pt: ptJson,
      es: esJson,
    },
    releasesUrl: repo ? `https://github.com/elvieira/LouvorJA/releases` : null,
  };

  // Salvar em cache (Versão Inicial)
  const cachePayload = {
    timestamp: Date.now(),
    data: result,
  };
  memoryCache.set(cacheKey, cachePayload);
  try {
    sessionStorage.setItem(cacheKey, JSON.stringify(cachePayload));
  } catch {
    // Storage cheio ou desabilitado
  }

  // 7. Processamento Secundário: Buscar fotos da galeria em BACKGROUND (Não trava a tela)
  setTimeout(async () => {
    const photoIndices = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
    
    const galleryUrls = await Promise.all(
      photoIndices.map(idx => findValidImage(cdnBaseUrl, idx))
    );

    let hasNewPhotos = false;
    galleryUrls.forEach((url, i) => {
      if (url) {
        result.galleryPhotos.push({
          src: url,
          name: `${photoIndices[i]}.webp`,
        });
        hasNewPhotos = true;
      }
    });

    // Atualiza o cache silenciosamente se encontrou fotos
    if (hasNewPhotos) {
      const updatedCachePayload = {
        timestamp: Date.now(),
        data: result,
      };
      memoryCache.set(cacheKey, updatedCachePayload);
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(updatedCachePayload));
      } catch {}
    }
  }, 0);

  return result;
}

function esResUrl(rawBase) {
  return `${rawBase}/es.json`;
}

/**
 * Carrega e valida todas as versões cadastradas
 */
export async function loadAllCommunityVersions(forceRefresh = false) {
  const promises = registeredVersions.map((v) => loadCommunityVersion(v, forceRefresh));
  const results = await Promise.all(promises);
  // Filtra apenas as versões que foram validadas com sucesso
  return results.filter((v) => v !== null);
}

/**
 * Atualiza dinamicamente as mensagens do Vue I18n com as traduções remotas
 */
export function injectRemoteTranslations(i18nInstance, validatedVersions) {
  if (!i18nInstance || !validatedVersions) return;

  const locales = ["pt", "es"];
  locales.forEach((locale) => {
    validatedVersions.forEach((v) => {
      const content = v.translations?.[locale];
      if (content) {
        if (i18nInstance.global?.messages?.value?.[locale]) {
          const current = i18nInstance.global.messages.value[locale];
          if (!current.community_versions) current.community_versions = {};
          current.community_versions[v.slug] = {
            ...(current.community_versions[v.slug] || {}),
            ...content,
          };
        }
      }
    });
  });
}
