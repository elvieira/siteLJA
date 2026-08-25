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
// Tempo de vida do cache na memória/sessionStorage (30 minutos)
const CACHE_TTL_MS = 30 * 60 * 1000; 

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
 * Busca por uma imagem válida com extensão (.webp)
 * Prioriza Raw GitHub (atualiza em ~5 min) e usa CDN como fallback (pode ter cache de até 7 dias).
 */
async function findValidImage(cdnBaseUrl, rawBaseUrl, name) {
  const url = `${cdnBaseUrl}/${name}.webp`;
  const rawUrl = `${rawBaseUrl}/${name}.webp`;
  const cacheBuster = Math.floor(Date.now() / (1000 * 60 * 30)); // muda a cada 30 min

  // 1. Tentar Raw GitHub primeiro (sempre tem a versão mais recente)
  try {
    const rawRes = await fetch(`${rawUrl}?v=${cacheBuster}`, { method: "HEAD" });
    if (rawRes.ok) {
      return `${rawUrl}?v=${cacheBuster}`;
    }
  } catch {
    // Raw indisponível, tenta CDN
  }

  // 2. Fallback: CDN (jsDelivr) — mais rápido, mas pode ter cache antigo
  try {
    const res = await fetch(`${url}?v=${cacheBuster}`, { method: "HEAD" });
    if (res.ok) {
      return `${url}?v=${cacheBuster}`;
    }
  } catch {
    // CDN também falhou
  }

  return null;
}

/**
 * Busca e valida os dados de uma versão específica
 */
export async function loadCommunityVersion(versionConfig, forceRefresh = false) {
  const { slug, repo, branch = "main", folder = "community", color = "#FBBF24", stage = "Beta", platforms = ["linux", "mac", "windows"] } = versionConfig;

  if (!repo) return null;

  // Verificar cache
  const cacheKey = `comm_ver_v7_${slug}`;
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

  // Função auxiliar: buscar JSON priorizando Raw GitHub (mais fresco) com CDN como fallback
  const fetchJsonFresh = async (filename) => {
    // 1. Tentar Raw GitHub primeiro (atualiza em ~5 min após commit)
    try {
      const rawRes = await fetch(`${rawBaseUrl}/${filename}`);
      if (rawRes.ok) return rawRes;
    } catch {}
    // 2. Fallback: CDN (pode ter cache de até 7 dias)
    try {
      const cdnRes = await fetch(`${cdnBaseUrl}/${filename}`);
      if (cdnRes.ok) return cdnRes;
    } catch {}
    return null;
  };

  // 1. Buscar pt.json e es.json (Rápido via CDN preferencialmente)
  try {
    const [ptRes, esRes] = await Promise.all([
      fetchJsonFresh("pt.json"),
      fetchJsonFresh("es.json"),
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
  const mainImgUrl = await findValidImage(cdnBaseUrl, rawBaseUrl, "main");
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
      photoIndices.map(idx => findValidImage(cdnBaseUrl, rawBaseUrl, idx))
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
