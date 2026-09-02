/**
 * Módulo Central de Versões da Comunidade
 * 
 * Integra o registro configurável (registry.js) com o carregador remoto (loader.js).
 */

export * from "./registry.js";
export * from "./loader.js";

import { registeredVersions } from "./registry.js";
import {
  loadCommunityVersion,
  loadAllCommunityVersions,
  parseColor,
  hexToRgba,
  hexToRgbString,
  getBadgeStyle,
  getVersionThemeStyles,
} from "./loader.js";

export { parseColor, getBadgeStyle };

/**
 * Retorna a configuração de uma versão a partir de seu slug
 */
export function getRegisteredVersion(slug) {
  if (!slug) return null;
  return registeredVersions.find((v) => v.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Retorna apenas as versões ativas no registry
 */
export function getActiveVersions() {
  return registeredVersions.filter((v) => v.enabled !== false && v.repo && v.repo.trim() !== "");
}

/**
 * Retorna os links de download estruturados por plataforma,
 * priorizando os assets reais da release mais recente do GitHub.
 */
export function getVersionDownloads(versionData, $t) {
  const t = (key) => {
    const res = $t ? $t(key) : key;
    return res !== key ? res : null;
  };

  const releases = versionData?.releases || [];
  const latestRelease = releases.length > 0 ? releases[0] : null;
  const rawAssets = latestRelease?.assets || [];
  const fallbackUrl =
    versionData?.releasesUrl ||
    (versionData?.repo ? `https://github.com/${versionData.repo}/releases` : "https://github.com/louvorja");

  // Extensões e sufixos ignorados (metadados de update, checksums, assinaturas)
  const IGNORED_EXTENSIONS = [
    ".blockmap",
    ".yml",
    ".yaml",
    ".sha256",
    ".sha512",
    ".md5",
    ".sig",
    ".asc",
    ".txt",
    ".json",
  ];

  // 1. Filtrar apenas assets executáveis/instaladores reais da release
  const validAssets = rawAssets.filter((asset) => {
    if (!asset || !asset.name) return false;
    const lower = asset.name.toLowerCase();
    return !IGNORED_EXTENSIONS.some((ext) => lower.endsWith(ext));
  });

  const formatSize = (bytes) => {
    if (!bytes || isNaN(bytes)) return "";
    return (bytes / (1024 * 1024)).toFixed(0) + " MB";
  };

  const linuxLinks = [];
  const macLinks = [];
  const winLinks = [];

  // 2. Percorrer TODOS os arquivos da release mais recente e classificar por extensão
  validAssets.forEach((asset) => {
    const name = asset.name;
    const lower = name.toLowerCase();
    const size = formatSize(asset.size);
    const url = asset.browser_download_url;

    // LINUX
    if (lower.endsWith(".appimage")) {
      const isArm = lower.includes("arm64") || lower.includes("aarch64");
      linuxLinks.push({
        label: isArm ? "Baixar .AppImage (ARM64)" : (t("community_versions.dl_linux_appimage") || "Baixar .AppImage"),
        ext: "appimage",
        icon: "fa fa-download",
        size,
        url,
      });
    } else if (lower.endsWith(".deb")) {
      const isArm = lower.includes("arm64") || lower.includes("aarch64");
      linuxLinks.push({
        label: isArm ? "Baixar pacote .deb (ARM64)" : (t("community_versions.dl_linux_deb") || "Baixar pacote .deb"),
        ext: "deb",
        icon: "fa fa-download",
        size,
        url,
      });
    } else if (lower.endsWith(".rpm")) {
      const isArm = lower.includes("arm64") || lower.includes("aarch64");
      linuxLinks.push({
        label: isArm ? "Baixar pacote .rpm (ARM64)" : (t("community_versions.dl_linux_rpm") || "Baixar pacote .rpm"),
        ext: "rpm",
        icon: "fa fa-download",
        size,
        url,
      });
    } else if (lower.endsWith(".tar.gz") || lower.endsWith(".tar.xz")) {
      const ext = lower.endsWith(".tar.gz") ? ".tar.gz" : ".tar.xz";
      linuxLinks.push({
        label: `Baixar arquivo ${ext}`,
        ext: "tar",
        icon: "fa fa-download",
        size,
        url,
      });
    } else if (lower.endsWith(".flatpak") || lower.endsWith(".snap")) {
      const ext = lower.endsWith(".flatpak") ? ".flatpak" : ".snap";
      linuxLinks.push({
        label: `Baixar pacote ${ext}`,
        ext: ext.replace(".", ""),
        icon: "fa fa-download",
        size,
        url,
      });
    }

    // MACOS
    else if (lower.endsWith(".dmg") || lower.endsWith(".pkg")) {
      const isArm = lower.includes("arm64") || lower.includes("aarch64") || lower.includes("apple");
      const ext = lower.endsWith(".dmg") ? ".dmg" : ".pkg";
      macLinks.push({
        label: isArm
          ? (t("community_versions.dl_mac_dmg_arm") || `Baixar ${ext} (ARM)`)
          : (t("community_versions.dl_mac_dmg_intel") || `Baixar ${ext} (Intel)`),
        ext: ext.replace(".", ""),
        isArm,
        icon: "fa fa-download",
        size,
        url,
      });
    } else if (lower.endsWith(".zip") && (lower.includes("mac") || lower.includes("darwin") || lower.includes("osx"))) {
      const isArm = lower.includes("arm64") || lower.includes("aarch64");
      macLinks.push({
        label: isArm ? "Baixar .zip (ARM)" : "Baixar .zip (Intel)",
        ext: "zip",
        isArm,
        icon: "fa fa-download",
        size,
        url,
      });
    }

    // WINDOWS
    else if (lower.endsWith(".exe")) {
      const isPortable = lower.includes("portable");
      const isArm = lower.includes("arm64");
      const is32 = lower.includes("ia32") || lower.includes("x86") || lower.includes("32bit");
      let label = t("community_versions.dl_win_exe") || "Baixar instalador .exe";
      if (isPortable) label = "Baixar versão portátil .exe";
      else if (isArm) label = "Baixar instalador .exe (ARM64)";
      else if (is32) label = "Baixar instalador .exe (32-bit)";

      winLinks.push({
        label,
        ext: "exe",
        icon: "fa fa-download",
        size,
        url,
      });
    } else if (lower.endsWith(".msi")) {
      winLinks.push({
        label: "Baixar instalador .msi",
        ext: "msi",
        icon: "fa fa-download",
        size,
        url,
      });
    } else if (lower.endsWith(".zip") && (lower.includes("win") || (!lower.includes("mac") && !lower.includes("linux")))) {
      winLinks.push({
        label: "Baixar versão portátil .zip",
        ext: "zip",
        icon: "fa fa-download",
        size,
        url,
      });
    }
  });

  const platforms = [];

  // 3. Montar card do Linux sob demanda (somente se houver pacotes Linux)
  if (linuxLinks.length > 0) {
    // Ordenar links: AppImage -> deb -> rpm -> outros
    const order = { appimage: 1, deb: 2, rpm: 3, tar: 4, flatpak: 5, snap: 6 };
    linuxLinks.sort((a, b) => (order[a.ext] || 99) - (order[b.ext] || 99));

    const badges = [...new Set(linuxLinks.map((l) => l.ext))];
    platforms.push({
      key: "linux",
      icon: "fa fa-linux",
      title: t("community_versions.dl_linux_title") || "Linux (64-bit)",
      badge: badges.join(" • ") || "x86_64",
      desc: t("community_versions.dl_linux_desc") || "Ubuntu, Debian, Fedora, Arch, Linux Mint, openSUSE, RedHat e derivadas.",
      links: linuxLinks,
    });
  }

  // 4. Montar card do macOS sob demanda (somente se houver pacotes macOS)
  // Se houver .dmg ou .pkg, prioriza os instaladores oficiais e oculta os .zip (usados internamente para auto-update)
  const hasDmgOrPkg = macLinks.some((l) => l.ext === "dmg" || l.ext === "pkg");
  const filteredMacLinks = hasDmgOrPkg ? macLinks.filter((l) => l.ext !== "zip") : macLinks;

  if (filteredMacLinks.length > 0) {
    // Ordenar: Intel primeiro, Apple Silicon segundo
    filteredMacLinks.sort((a, b) => (a.isArm ? 1 : -1));

    const hasArm = filteredMacLinks.some((l) => l.isArm);
    const hasIntel = filteredMacLinks.some((l) => !l.isArm);
    let badge = "macOS";
    if (hasArm && hasIntel) badge = "Intel & ARM64";
    else if (hasArm) badge = "Apple Silicon";
    else if (hasIntel) badge = "Intel (x86_64)";

    platforms.push({
      key: "mac",
      icon: "fa fa-apple",
      title: t("community_versions.dl_mac_title") || "macOS",
      badge,
      desc: t("community_versions.dl_mac_desc") || "Compatível com macOS 11 Big Sur ou superior.",
      links: filteredMacLinks,
    });
  }

  // 5. Montar card do Windows sob demanda (somente se houver pacotes Windows)
  if (winLinks.length > 0) {
    platforms.push({
      key: "windows",
      icon: "fa fa-windows",
      title: t("community_versions.dl_win_title") || "Windows (64-bit)",
      badge: "64-bit (x64)",
      desc: t("community_versions.dl_win_desc") || "Compatível com Windows 10 e Windows 11.",
      links: winLinks,
    });
  }

  // 6. Se não houver nenhum instalador publicado, exibe card informativo para o repositório
  if (platforms.length === 0) {
    platforms.push({
      key: "fallback",
      icon: "fa fa-github",
      title: "Repositório Oficial",
      badge: "Código Fonte",
      desc: "Nenhum instalador pronto encontrado nesta versão. Acesse o repositório para baixar o código fonte ou compilar manualmente.",
      links: [
        {
          label: "Acessar Repositório (GitHub)",
          icon: "fa fa-external-link",
          size: "Ver",
          url: fallbackUrl,
        },
      ],
    });
  }

  return platforms;
}

/**
 * Detecta o sistema operacional e arquitetura do usuário no navegador.
 * Retorna { os: 'windows' | 'mac' | 'linux' | null, arch: 'arm' | 'intel' | null }
 */
export function detectUserPlatform() {
  if (typeof window === "undefined" || !navigator) {
    return { os: null, arch: null };
  }

  const ua = (navigator.userAgent || "").toLowerCase();
  const platform = (navigator.userAgentData?.platform || navigator.platform || "").toLowerCase();

  let os = null;
  let arch = null;

  if (platform.includes("win") || ua.includes("windows")) {
    os = "windows";
    arch = (ua.includes("arm64") || ua.includes("aarch64")) ? "arm" : "x64";
  } else if (platform.includes("mac") || ua.includes("macintosh") || ua.includes("mac os")) {
    os = "mac";
    let isArm = false;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
          isArm = renderer.includes("Apple");
        }
      }
    } catch {}
    arch = isArm ? "arm" : "intel";
  } else if (platform.includes("linux") || ua.includes("linux") || ua.includes("x11")) {
    os = "linux";
    arch = (ua.includes("arm64") || ua.includes("aarch64")) ? "arm" : "x64";
  }

  return { os, arch };
}

export default {
  registeredVersions,
  getRegisteredVersion,
  getActiveVersions,
  loadCommunityVersion,
  loadAllCommunityVersions,
  getVersionDownloads,
  detectUserPlatform,
  parseColor,
  getBadgeStyle,
  hexToRgba,
  hexToRgbString,
  getVersionThemeStyles,
};
