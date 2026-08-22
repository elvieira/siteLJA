/**
 * Gerenciador Modular de Versões do Louvor JA
 */

// Auto-descoberta de todas as imagens em src/versions/**/assets/
const versionAssets = import.meta.glob("./**/assets/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  import: "default",
});

export const activeVersions = ["violin", "piano", "flute"];

export const getVersionMainImage = (slug) => {
  const entry = Object.entries(versionAssets).find(
    ([path]) =>
      path.includes(`/${slug}/`) &&
      /\/main\.(jpe?g|png|webp|svg)$/i.test(path)
  );
  return entry ? entry[1] : null;
};

export const getVersionGallery = (slug) => {
  return Object.entries(versionAssets)
    .filter(
      ([path]) =>
        path.includes(`/${slug}/`) &&
        !/\/main\.(jpe?g|png|webp|svg)$/i.test(path)
    )
    .sort(([a], [b]) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    )
    .map(([path, src]) => ({
      src,
      path,
    }));
};

export const versionMetadata = {
  violin: {
    slug: "violin",
    codename: "Violin",
    repo: null,
    get mainImage() {
      return getVersionMainImage("violin");
    },
  },
  piano: {
    slug: "piano",
    codename: "Piano",
    repo: null,
    get mainImage() {
      return getVersionMainImage("piano");
    },
  },
  flute: {
    slug: "flute",
    codename: "Flute",
    repo: "elvieira/LouvorJA",
    releasesUrl: "https://github.com/elvieira/LouvorJA/releases",
    get mainImage() {
      return getVersionMainImage("flute");
    },
  },
};

export const getVersionDownloads = (slug, $t) => {
  const t = (key) => $t(key);
  const configs = {
    flute: [
      {
        icon: "fa fa-linux",
        title: t("community_versions.dl_linux_title"),
        badge: "deb • rpm • appimage",
        desc: t("community_versions.dl_linux_desc"),
        links: [
          {
            label: t("community_versions.dl_linux_appimage"),
            icon: "fa fa-download",
            size: "146 MB",
            url: "https://github.com/elvieira/LouvorJA/releases/latest/download/Louvor-JA-1.8.8.AppImage",
          },
          {
            label: t("community_versions.dl_linux_deb"),
            icon: "fa fa-download",
            size: "110 MB",
            url: "https://github.com/elvieira/LouvorJA/releases/latest/download/louvorja_1.8.8_amd64.deb",
          },
          {
            label: t("community_versions.dl_linux_rpm"),
            icon: "fa fa-download",
            size: "96 MB",
            url: "https://github.com/elvieira/LouvorJA/releases/latest/download/louvorja-1.8.8.x86_64.rpm",
          },
        ],
      },
      {
        icon: "fa fa-apple",
        title: t("community_versions.dl_mac_title"),
        badge: "Intel & ARM64",
        desc: t("community_versions.dl_mac_desc"),
        links: [
          {
            label: t("community_versions.dl_mac_dmg_intel"),
            icon: "fa fa-download",
            size: "140 MB",
            url: "https://github.com/elvieira/LouvorJA/releases/latest/download/Louvor-JA-1.8.8.dmg",
          },
          {
            label: t("community_versions.dl_mac_dmg_arm"),
            icon: "fa fa-download",
            size: "138 MB",
            url: "https://github.com/elvieira/LouvorJA/releases/latest/download/Louvor-JA-1.8.8-arm64.dmg",
          },
        ],
      },
      {
        icon: "fa fa-windows",
        title: t("community_versions.dl_win_title"),
        badge: "64-bit (x64)",
        desc: t("community_versions.dl_win_desc"),
        links: [
          {
            label: t("community_versions.dl_win_exe"),
            icon: "fa fa-download",
            size: "116 MB",
            url: "https://github.com/elvieira/LouvorJA/releases/latest/download/Louvor-JA-Setup-1.8.8.exe",
          },
        ],
      },
    ],
    violin: [
      {
        icon: "fa fa-linux",
        title: t("community_versions.dl_linux_title"),
        badge: "x86_64",
        desc: t("community_versions.dl_linux_desc"),
        links: [
          {
            label: t("community_versions.dl_linux_appimage"),
            icon: "fa fa-download",
            size: "18 MB",
            url: "https://github.com/louvorja",
          },
          {
            label: t("community_versions.dl_linux_deb"),
            icon: "fa fa-download",
            size: "14 MB",
            url: "https://github.com/louvorja",
          },
        ],
      },
      {
        icon: "fa fa-apple",
        title: t("community_versions.dl_mac_title"),
        badge: "Universal",
        desc: t("community_versions.dl_mac_desc"),
        links: [
          {
            label: t("community_versions.dl_mac_dmg"),
            icon: "fa fa-download",
            size: "22 MB",
            url: "https://github.com/louvorja",
          },
        ],
      },
      {
        icon: "fa fa-windows",
        title: t("community_versions.dl_win_title"),
        badge: "Win 10/11",
        desc: t("community_versions.dl_win_desc"),
        links: [
          {
            label: t("community_versions.dl_win_exe"),
            icon: "fa fa-download",
            size: "16 MB",
            url: "https://github.com/louvorja",
          },
          {
            label: t("community_versions.dl_win_portable"),
            icon: "fa fa-file-archive-o",
            size: "15 MB",
            url: "https://github.com/louvorja",
          },
        ],
      },
    ],
    piano: [
      {
        icon: "fa fa-linux",
        title: t("community_versions.dl_linux_title"),
        badge: "x86_64",
        desc: t("community_versions.dl_linux_desc"),
        links: [
          {
            label: t("community_versions.dl_linux_appimage"),
            icon: "fa fa-download",
            size: "88 MB",
            url: "https://github.com/louvorja",
          },
          {
            label: t("community_versions.dl_linux_deb"),
            icon: "fa fa-download",
            size: "82 MB",
            url: "https://github.com/louvorja",
          },
        ],
      },
      {
        icon: "fa fa-apple",
        title: t("community_versions.dl_mac_title"),
        badge: "Universal",
        desc: t("community_versions.dl_mac_desc"),
        links: [
          {
            label: t("community_versions.dl_mac_dmg"),
            icon: "fa fa-download",
            size: "95 MB",
            url: "https://github.com/louvorja",
          },
        ],
      },
      {
        icon: "fa fa-windows",
        title: t("community_versions.dl_win_title"),
        badge: "Win 10/11",
        desc: t("community_versions.dl_win_desc"),
        links: [
          {
            label: t("community_versions.dl_win_exe"),
            icon: "fa fa-download",
            size: "84 MB",
            url: "https://github.com/louvorja",
          },
          {
            label: t("community_versions.dl_win_portable"),
            icon: "fa fa-file-archive-o",
            size: "86 MB",
            url: "https://github.com/louvorja",
          },
        ],
      },
    ],
  };

  return configs[slug] || configs.flute;
};

export default {
  activeVersions,
  versionMetadata,
  getVersionMainImage,
  getVersionGallery,
  getVersionDownloads,
};
