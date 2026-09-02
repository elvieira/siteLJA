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

import { registeredVersions } from "./registry.js";

// Cache em memória durante a sessão
const memoryCache = new Map();
// Tempo de vida do cache dos dados remotos (30 minutos)
const CACHE_TTL_MS = 30 * 60 * 1000;

const NAMED_COLORS = {
  green: { r: 34, g: 197, b: 94 },
  verde: { r: 34, g: 197, b: 94 },
  lime: { r: 132, g: 204, b: 22 },
  emerald: { r: 16, g: 185, b: 129 },
  blue: { r: 0, g: 132, b: 193 },
  azul: { r: 0, g: 132, b: 193 },
  red: { r: 239, g: 68, b: 68 },
  vermelho: { r: 239, g: 68, b: 68 },
  orange: { r: 249, g: 115, b: 22 },
  laranja: { r: 249, g: 115, b: 22 },
  purple: { r: 168, g: 85, b: 247 },
  roxo: { r: 168, g: 85, b: 247 },
  violet: { r: 139, g: 92, b: 246 },
  yellow: { r: 234, g: 179, b: 8 },
  amarelo: { r: 234, g: 179, b: 8 },
  cyan: { r: 6, g: 182, b: 212 },
  pink: { r: 236, g: 72, b: 153 },
  rosa: { r: 236, g: 72, b: 153 },
};

/**
 * Lista de todos os campos que devem estar obrigatoriamente preenchidos
 * tanto no pt.json quanto no es.json para que a versão seja aceita.
 */
export const REQUIRED_TRANSLATION_FIELDS = [
  "name",
  "subtitle",
  "short_desc",
  "overview_desc",
  "feature1_icon",
  "feature1_title",
  "feature1_desc",
  "feature2_icon",
  "feature2_title",
  "feature2_desc",
  "feature3_icon",
  "feature3_title",
  "feature3_desc",
  "feature4_icon",
  "feature4_title",
  "feature4_desc",
  "req_os_min",
  "req_os_rec",
  "req_cpu_min",
  "req_cpu_rec",
  "req_ram_min",
  "req_ram_rec",
  "req_gpu_min",
  "req_gpu_rec",
  "req_disk_min",
  "req_disk_rec",
  "req_screens_min",
  "req_screens_rec",
];

/**
 * Valida se o objeto de tradução contém todos os campos obrigatórios preenchidos
 * e se o campo 'name' coincide exatamente com o 'codename' registrado no registry.js.
 */
export function validateTranslationData(data, expectedCodename) {
  if (!data || typeof data !== "object") return false;

  // O campo 'name' tem que ser exatamente o mesmo do 'codename' do registry
  if (!data.name || data.name.trim() !== (expectedCodename || "").trim()) {
    return false;
  }

  // Todos os dados devem estar preenchidos obrigatoriamente
  for (const field of REQUIRED_TRANSLATION_FIELDS) {
    if (typeof data[field] !== "string" || data[field].trim() === "") {
      return false;
    }
  }

  return true;
}

/**
 * Converte qualquer entrada de cor (hex #RRGGBB, #RGB, nomes comuns ou rgb)
 * em um objeto { r, g, b } normalizado e calibrado.
 */
export function parseColor(input) {
  if (!input) return { r: 0, g: 132, b: 193 };
  const str = String(input).trim().toLowerCase();
  if (NAMED_COLORS[str]) return NAMED_COLORS[str];

  let hex = str.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((x) => x + x).join("");
  }
  if (hex.length >= 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return { r, g, b };
    }
  }
  return { r: 0, g: 132, b: 193 };
}

/**
 * Converte RGB (0-255) para HSL (h: 0-360, s: 0-100, l: 0-100)
 */
export function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converte HSL (h: 0-360, s: 0-100, l: 0-100) para RGB (0-255)
 */
export function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Converte cor para string RGBA para estilização dinâmica
 */
export function hexToRgba(colorInput, alpha = 1) {
  const { r, g, b } = parseColor(colorInput);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Converte cor para string de componentes "R, G, B" (ideal para CSS variables)
 */
export function hexToRgbString(colorInput) {
  const { r, g, b } = parseColor(colorInput);
  return `${r}, ${g}, ${b}`;
}

/**
 * Calcula automaticamente o conjunto de estilos do badge (texto, fundo e borda),
 * incluindo provisão inteligente para cores muito escuras (preto, grafite, azul-marinho,
 * verde floresta, roxo escuro, etc.) para garantir contraste e legibilidade impecáveis.
 */
export function getBadgeStyle(colorInput) {
  const base = parseColor(colorInput);
  const lum = (0.299 * base.r + 0.587 * base.g + 0.114 * base.b) / 255;
  const hsl = rgbToHsl(base.r, base.g, base.b);

  let textRgb = { ...base };
  let bgRgb = { ...base };
  let borderRgb = { ...base };
  let bgAlpha = 0.16;
  let borderAlpha = 0.38;

  // Se a cor for muito escura para contraste em dark mode (luminância < 0.32 ou L < 35%)
  if (lum < 0.32 || hsl.l < 35) {
    if (hsl.s < 12) {
      // Cores escuras monocromáticas (preto, grafite, cinza escuro)
      textRgb = { r: 241, g: 245, b: 249 }; // Slate 100 suave
      bgRgb = { r: 255, g: 255, b: 255 };
      bgAlpha = 0.08;
      borderRgb = { r: 255, g: 255, b: 255 };
      borderAlpha = 0.18;
    } else {
      // Cores escuras com matiz (azul escuro, verde escuro, roxo escuro, etc.)
      // Eleva a luminosidade mantendo o matiz e saturação originais vivos
      textRgb = hslToRgb(hsl.h, Math.max(hsl.s, 45), 65);
      bgRgb = textRgb;
      borderRgb = textRgb;
      bgAlpha = 0.16;
      borderAlpha = 0.38;
    }
  }

  return {
    color: `rgb(${textRgb.r}, ${textRgb.g}, ${textRgb.b})`,
    backgroundColor: `rgba(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b}, ${bgAlpha})`,
    borderColor: `rgba(${borderRgb.r}, ${borderRgb.g}, ${borderRgb.b}, ${borderAlpha})`,
    boxShadow: `0 0 12px rgba(${textRgb.r}, ${textRgb.g}, ${textRgb.b}, 0.15)`,
  };
}

/**
 * Retorna o mapa de variáveis CSS prontas para estilizar a versão,
 * também com compensação automática para cores escuras.
 */
export function getVersionThemeStyles(colorInput) {
  const badge = getBadgeStyle(colorInput);
  const base = parseColor(colorInput);
  const rgbStr = `${base.r}, ${base.g}, ${base.b}`;
  const hexStr = `#${((1 << 24) + (base.r << 16) + (base.g << 8) + base.b).toString(16).slice(1)}`;

  return {
    "--ver-color": hexStr,
    "--ver-color-rgb": rgbStr,
    "--ver-color-10": `rgba(${rgbStr}, 0.1)`,
    "--ver-color-15": badge.backgroundColor,
    "--ver-color-25": `rgba(${rgbStr}, 0.25)`,
    "--ver-color-35": badge.borderColor,
  };
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
 * Monta o objeto unificado da versão combinando as configurações locais vivas (registry.js)
 * com os dados e assets obtidos remotamente (GitHub).
 */
function assembleVersion(config, remoteData) {
  const latestRelease = remoteData.releases?.length > 0 ? remoteData.releases[0] : null;
  const rawTag = latestRelease ? latestRelease.tag_name : (remoteData.ptJson?.version || "v1.0.0");
  const stage = config.stage || "";
  const versionTag = stage && !rawTag.toLowerCase().includes(stage.toLowerCase())
    ? `${rawTag} (${stage})`
    : rawTag;

  // Deduplicar fotos garantindo que nunca haja repetições
  const seenPhotos = new Set();
  const galleryPhotos = [];
  if (Array.isArray(remoteData.galleryPhotos)) {
    for (const p of remoteData.galleryPhotos) {
      const key = p.name || p.src;
      if (key && !seenPhotos.has(key)) {
        seenPhotos.add(key);
        galleryPhotos.push(p);
      }
    }
  }

  const color = config.color || "#0084c1";

  return {
    slug: config.slug,
    codename: config.codename || remoteData.ptJson?.name || config.slug.charAt(0).toUpperCase() + config.slug.slice(1),
    repo: config.repo,
    branch: config.branch || "main",
    folder: config.folder || "community",
    color,
    stage: config.stage || "Beta",
    platforms: config.platforms || ["windows", "mac", "linux"],
    enabled: config.enabled !== false,
    isRemote: remoteData.isRemote,
    versionTag,
    rawTag,
    mainImage: remoteData.mainImage,
    galleryPhotos,
    releases: remoteData.releases || [],
    translations: {
      pt: remoteData.ptJson,
      es: remoteData.esJson,
    },
    releasesUrl: config.repo ? `https://github.com/${config.repo}/releases` : null,
    themeStyles: getVersionThemeStyles(color),
  };
}

/**
 * Busca e valida os dados de uma versão específica.
 * Aceita tanto o objeto de configuração quanto o slug da versão.
 */
export async function loadCommunityVersion(versionConfigOrSlug, forceRefresh = false) {
  let config = versionConfigOrSlug;
  if (typeof versionConfigOrSlug === "string") {
    config = registeredVersions.find(
      (v) => v.slug.toLowerCase() === versionConfigOrSlug.toLowerCase()
    );
  }

  if (!config || config.enabled === false || !config.repo || config.repo.trim() === "") {
    return null;
  }

  const { slug, repo, branch = "main", folder = "community" } = config;
  const cacheKey = `comm_remote_v10_${slug}`;

  // 1. Verificar cache dos dados remotos (em memória)
  if (!forceRefresh && memoryCache.has(cacheKey)) {
    const cached = memoryCache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return assembleVersion(config, cached.remoteData);
    }
  }

  // 2. Verificar cache dos dados remotos (no sessionStorage)
  if (!forceRefresh) {
    try {
      const stored = sessionStorage.getItem(cacheKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          memoryCache.set(cacheKey, parsed);
          return assembleVersion(config, parsed.remoteData);
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
  let releases = [];
  let isRemote = false;

  // Função auxiliar para buscar JSON priorizando Raw GitHub com CDN como fallback
  const fetchJsonFresh = async (filename) => {
    try {
      const rawRes = await fetch(`${rawBaseUrl}/${filename}`);
      if (rawRes.ok) return rawRes;
    } catch {}
    try {
      const cdnRes = await fetch(`${cdnBaseUrl}/${filename}`);
      if (cdnRes.ok) return cdnRes;
    } catch {}
    return null;
  };

  // Buscar pt.json e es.json
  try {
    const [ptRes, esRes] = await Promise.all([
      fetchJsonFresh("pt.json"),
      fetchJsonFresh("es.json"),
    ]);

    if (ptRes && ptRes.ok && esRes && esRes.ok) {
      const ptData = await ptRes.json();
      const esData = await esRes.json();

      const ptValid = validateTranslationData(ptData, config.codename);
      const esValid = validateTranslationData(esData, config.codename);

      if (ptValid && esValid) {
        ptJson = ptData;
        esJson = esData;
        isRemote = true;
      } else {
        console.warn(
          `[CommunityLoader] Validação estrita falhou para '${slug}': pt.json ou es.json possuem campos ausentes/vazios, ou 'name' não corresponde exatamente ao codename '${config.codename}'.`
        );
      }
    }
  } catch (err) {
    console.warn(`[CommunityLoader] Repositório remoto de ${slug} inacessível.`);
  }

  // Se não tem arquivos mínimos no GitHub, a versão não é renderizada
  if (!isRemote || !ptJson || !esJson) {
    return null;
  }

  // Buscar Imagem Principal OBRIGATÓRIA
  const mainImgUrl = await findValidImage(cdnBaseUrl, rawBaseUrl, "main");
  if (!mainImgUrl) {
    return null;
  }

  // Buscar Releases do GitHub
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

  // Buscar fotos da galeria (01.webp até 12.webp) em paralelo
  const photoIndices = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const galleryUrls = await Promise.all(
    photoIndices.map((idx) => findValidImage(cdnBaseUrl, rawBaseUrl, idx))
  );

  const galleryPhotos = [];
  galleryUrls.forEach((url, i) => {
    if (url) {
      galleryPhotos.push({
        src: url,
        name: `${photoIndices[i]}.webp`,
      });
    }
  });

  // Montar payload remoto puro para cache
  const remoteData = {
    ptJson,
    esJson,
    mainImage: mainImgUrl,
    galleryPhotos,
    releases,
    isRemote,
  };

  const cachePayload = {
    timestamp: Date.now(),
    remoteData,
  };

  memoryCache.set(cacheKey, cachePayload);
  try {
    sessionStorage.setItem(cacheKey, JSON.stringify(cachePayload));
  } catch {}

  return assembleVersion(config, remoteData);
}

/**
 * Carrega e valida todas as versões ativas cadastradas no registry
 */
export async function loadAllCommunityVersions(forceRefresh = false) {
  const activeConfigs = registeredVersions.filter(
    (v) => v.enabled !== false && v.repo && v.repo.trim() !== ""
  );
  const promises = activeConfigs.map((v) => loadCommunityVersion(v, forceRefresh));
  const results = await Promise.all(promises);
  return results.filter(Boolean);
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
