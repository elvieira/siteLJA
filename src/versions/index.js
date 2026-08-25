/**
 * Módulo Central de Versões da Comunidade
 * 
 * Integra o registro configurável (registry.js) com o carregador remoto (loader.js).
 */

export * from "./registry";
export * from "./loader";

import { registeredVersions } from "./registry";
import { loadCommunityVersion, loadAllCommunityVersions, hexToRgba } from "./loader";

/**
 * Retorna os links de download estruturados por plataforma,
 * priorizando os assets reais da release mais recente do GitHub.
 */
export function getVersionDownloads(versionData, $t) {
  const t = (key) => {
    const res = $t(key);
    // fallback if translation is missing (vue-i18n returns key name)
    return res !== key ? res : null;
  };
  
  const releases = versionData?.releases || [];
  const latestRelease = releases.length > 0 ? releases[0] : null;
  const assets = latestRelease?.assets || [];
  const fallbackUrl = versionData?.releasesUrl || `https://github.com/${versionData?.repo || 'elvieira/LouvorJA'}/releases`;

  // Helper para buscar asset pelo tipo de extensão/nome
  const findAsset = (predicate) => {
    const asset = assets.find(predicate);
    if (!asset) return null;
    const sizeMB = (asset.size / (1024 * 1024)).toFixed(0) + " MB";
    return {
      url: asset.browser_download_url,
      size: sizeMB,
    };
  };

  const appImage = findAsset((a) => a.name.endsWith(".AppImage"));
  const deb = findAsset((a) => a.name.endsWith(".deb"));
  const rpm = findAsset((a) => a.name.endsWith(".rpm"));
  const dmgIntel = findAsset((a) => a.name.endsWith(".dmg") && !a.name.toLowerCase().includes("arm64") && !a.name.toLowerCase().includes("aarch64"));
  const dmgArm = findAsset((a) => a.name.endsWith(".dmg") && (a.name.toLowerCase().includes("arm64") || a.name.toLowerCase().includes("aarch64")));
  const exe = findAsset((a) => a.name.endsWith(".exe"));
  const zip = findAsset((a) => a.name.endsWith(".zip") && !a.name.includes("blockmap"));

  const platforms = [];

  // 1. Linux
  const linuxLinks = [];
  if (appImage) linuxLinks.push({ label: t("community_versions.dl_linux_appimage") || "Baixar .AppImage", icon: "fa fa-download", size: appImage.size, url: appImage.url });
  if (deb) linuxLinks.push({ label: t("community_versions.dl_linux_deb") || "Baixar pacote .deb", icon: "fa fa-download", size: deb.size, url: deb.url });
  if (rpm) linuxLinks.push({ label: t("community_versions.dl_linux_rpm") || "Baixar pacote .rpm", icon: "fa fa-download", size: rpm.size, url: rpm.url });
  
  if (linuxLinks.length > 0) {
    const badges = [];
    if (deb) badges.push("deb");
    if (rpm) badges.push("rpm");
    if (appImage) badges.push("appimage");
    
    platforms.push({
      icon: "fa fa-linux",
      title: t("community_versions.dl_linux_title") || "Linux",
      badge: badges.join(" • ") || "x86_64",
      desc: t("community_versions.dl_linux_desc") || "Distribuições Linux suportadas.",
      links: linuxLinks
    });
  }

  // 2. Mac
  const macLinks = [];
  if (dmgIntel && dmgArm) {
    macLinks.push({ label: t("community_versions.dl_mac_dmg_intel") || "Baixar .dmg (Intel)", icon: "fa fa-download", size: dmgIntel.size, url: dmgIntel.url });
    macLinks.push({ label: t("community_versions.dl_mac_dmg_arm") || "Baixar .dmg (Apple Silicon)", icon: "fa fa-download", size: dmgArm.size, url: dmgArm.url });
  } else if (dmgIntel) {
    macLinks.push({ label: t("community_versions.dl_mac_dmg") || "Baixar Instalador .dmg", icon: "fa fa-download", size: dmgIntel.size, url: dmgIntel.url });
  } else if (dmgArm) {
    macLinks.push({ label: t("community_versions.dl_mac_dmg_arm") || "Baixar Instalador .dmg (ARM)", icon: "fa fa-download", size: dmgArm.size, url: dmgArm.url });
  }
  
  if (macLinks.length > 0) {
    platforms.push({
      icon: "fa fa-apple",
      title: t("community_versions.dl_mac_title") || "macOS",
      badge: (dmgIntel && dmgArm) ? "Intel & ARM64" : "Universal",
      desc: t("community_versions.dl_mac_desc") || "Compatível com macOS.",
      links: macLinks
    });
  }

  // 3. Windows
  const winLinks = [];
  if (exe) winLinks.push({ label: t("community_versions.dl_win_exe") || "Baixar instalador .exe", icon: "fa fa-download", size: exe.size, url: exe.url });
  
  if (winLinks.length > 0) {
    platforms.push({
      icon: "fa fa-windows",
      title: t("community_versions.dl_win_title") || "Windows",
      badge: "64-bit (x64)",
      desc: t("community_versions.dl_win_desc") || "Compatível com Windows 10 e 11.",
      links: winLinks
    });
  }

  // Se não tem release publicada com assets executáveis, mostra fallback para o Repositório
  if (platforms.length === 0) {
    platforms.push({
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
        }
      ]
    });
  }

  return platforms;
}

export default {
  registeredVersions,
  loadCommunityVersion,
  loadAllCommunityVersions,
  getVersionDownloads,
  hexToRgba,
};
