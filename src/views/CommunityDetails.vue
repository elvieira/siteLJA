<template>
  <section class="community-details-page spad set-bg">
    <div class="container text-white">
      <!-- Back Navigation -->
      <div class="row mb-4">
        <div class="col-12">
          <router-link :to="{ name: 'community' }" class="help-back-link">
            <i class="fa fa-arrow-left"></i>
            <span>{{ $t("community_versions.back_btn") }}</span>
          </router-link>
        </div>
      </div>

      <!-- Header Hero -->
      <div class="row mb-4">
        <div class="col-lg-10">
          <div class="d-flex align-items-center gap-3 mb-4" style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
            <div class="version-logo">
              <div class="text-logo p-0" style="font-size: 32px; letter-spacing: -0.02em;">
                {{ $t("logo.text-normal") }}
                <span>JA</span>
              </div>
              <span class="codename-badge" :class="'codename-' + currentSlug" style="font-size: 14px; padding: 4px 14px;">
                {{ currentCodename }}
              </span>
            </div>
            <span class="help-count-badge" style="font-size: 13px; padding: 4px 12px;">
              {{ currentVersionTag || $t('community_versions.' + currentSlug + '.version') }}
            </span>
          </div>
          <p class="lead text-muted-custom mb-0" style="font-size: 18px; line-height: 1.7;">
            {{ $t('community_versions.' + currentSlug + '.overview_desc') }}
          </p>
        </div>
      </div>

      <!-- 1. Foto Principal (Fixa e Independente) -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="comm-card p-2 p-md-3 overflow-hidden text-center" style="border-radius: 18px;">
            <img
              :src="currentMockup"
              :alt="'Louvor JA ' + currentCodename"
              class="img-fluid"
              style="border-radius: 12px; width: 100%; max-height: 540px; object-fit: cover;"
            />
          </div>
        </div>
      </div>

      <!-- 2. Galeria de Fotos Pequenas Distribuídas Uniformemente (Abaixo da foto principal) -->
      <div v-if="galleryPhotos.length > 0" class="row mb-5">
        <div class="col-12">
          <div class="comm-card p-4">
            <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
              <div class="d-flex align-items-center gap-2" style="display: flex; gap: 10px; align-items: center;">
                <i class="fa fa-camera text-warning" style="font-size: 22px;"></i>
                <h5 class="m-0 text-white font-weight-bold">{{ $t("community_versions.gallery_title") }}</h5>
              </div>
              <span class="text-muted-custom" style="font-size: 13px;">
                <i class="fa fa-search-plus mr-1"></i> {{ $t("community_versions.gallery_hint") }}
              </span>
            </div>

            <!-- Grid Uniforme de Miniaturas -->
            <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
              <div
                v-for="(photo, pIdx) in galleryPhotos"
                :key="pIdx"
                class="col mb-3"
              >
                <div
                  class="comm-gallery-card"
                  @click="openLightbox(pIdx)"
                  title="Clique para expandir"
                >
                  <img :src="photo.src" :alt="'Screenshot ' + (pIdx + 1)" />
                  <div class="comm-gallery-overlay">
                    <i class="fa fa-search-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Downloads Section (Independent per Version) -->
      <div id="downloads-section" class="row mb-5 pt-3">
        <div class="col-12 mb-4">
          <div class="section-title text-left mb-2">
            <h2>{{ $t("community_versions.downloads_title") }}</h2>
          </div>
          <p class="text-muted-custom">{{ $t("community_versions.downloads_subtitle") }}</p>
        </div>

        <div
          v-for="(platform, index) in currentDownloads"
          :key="index"
          class="col-lg-4 col-md-6 mb-4"
        >
          <div class="comm-card justify-content-between p-4 h-100">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center gap-2" style="display: flex; gap: 10px; align-items: center;">
                  <i :class="platform.icon + ' text-warning'" style="font-size: 28px;"></i>
                  <h5 class="m-0 text-white font-weight-bold">{{ platform.title }}</h5>
                </div>
                <span class="help-count-badge">{{ platform.badge }}</span>
              </div>
              <p class="text-muted-custom mb-4" style="font-size: 13.5px; line-height: 1.55;">{{ platform.desc }}</p>
            </div>
            <div class="d-flex flex-column gap-2" style="display: flex; flex-direction: column; gap: 10px;">
              <a
                v-for="(link, lIdx) in platform.links"
                :key="lIdx"
                :href="link.url || 'https://github.com/louvorja'"
                target="_blank"
                class="btn-all-topics"
              >
                <i :class="link.icon || 'fa fa-download'"></i>
                <span>{{ link.label }}</span>
                <span v-if="link.size" class="badge badge-dark ml-auto" style="background: rgba(255,255,255,0.1);">{{ link.size }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Grid (4 Cards) -->
      <div class="row mb-5">
        <div class="col-12 mb-4">
          <div class="section-title text-left mb-2">
            <h2>{{ $t("community_versions.features_title") }}</h2>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <div class="comm-card p-4">
            <div class="faq-cta-icon mb-3">
              <i :class="$t('community_versions.' + currentSlug + '.feature1_icon') || 'fa fa-database'"></i>
            </div>
            <h5 class="text-white font-weight-bold mb-2">{{ $t('community_versions.' + currentSlug + '.feature1_title') }}</h5>
            <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ $t('community_versions.' + currentSlug + '.feature1_desc') }}</p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <div class="comm-card p-4">
            <div class="faq-cta-icon mb-3">
              <i :class="$t('community_versions.' + currentSlug + '.feature2_icon') || 'fa fa-desktop'"></i>
            </div>
            <h5 class="text-white font-weight-bold mb-2">{{ $t('community_versions.' + currentSlug + '.feature2_title') }}</h5>
            <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ $t('community_versions.' + currentSlug + '.feature2_desc') }}</p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <div class="comm-card p-4">
            <div class="faq-cta-icon mb-3">
              <i :class="$t('community_versions.' + currentSlug + '.feature3_icon') || 'fa fa-bolt'"></i>
            </div>
            <h5 class="text-white font-weight-bold mb-2">{{ $t('community_versions.' + currentSlug + '.feature3_title') }}</h5>
            <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ $t('community_versions.' + currentSlug + '.feature3_desc') }}</p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <div class="comm-card p-4">
            <div class="faq-cta-icon mb-3">
              <i :class="$t('community_versions.' + currentSlug + '.feature4_icon') || 'fa fa-check-circle'"></i>
            </div>
            <h5 class="text-white font-weight-bold mb-2">{{ $t('community_versions.' + currentSlug + '.feature4_title') }}</h5>
            <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ $t('community_versions.' + currentSlug + '.feature4_desc') }}</p>
          </div>
        </div>
      </div>

      <!-- System Requirements Table (Detailed) -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="comm-card p-4 p-md-5">
            <div class="d-flex align-items-center gap-3 mb-4" style="display: flex; gap: 12px; align-items: center;">
              <div class="faq-cta-icon">
                <i class="fa fa-cogs"></i>
              </div>
              <h4 class="m-0 text-white font-weight-bold">{{ $t("community_versions.requirements_title") }}</h4>
            </div>

            <div class="comm-req-table-wrapper">
              <table class="comm-req-table">
                <thead>
                  <tr>
                    <th style="width: 22%;">{{ $t("community_versions.req_table_comp") }}</th>
                    <th style="width: 39%;">{{ $t("community_versions.req_table_min") }}</th>
                    <th style="width: 39%;">{{ $t("community_versions.req_table_rec") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ $t("community_versions.req_os_title") }}</td>
                    <td>{{ $t('community_versions.' + currentSlug + '.req_os_min') }}</td>
                    <td class="text-warning">{{ $t('community_versions.' + currentSlug + '.req_os_rec') }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("community_versions.req_cpu_title") }}</td>
                    <td>{{ $t('community_versions.' + currentSlug + '.req_cpu_min') }}</td>
                    <td>{{ $t('community_versions.' + currentSlug + '.req_cpu_rec') }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("community_versions.req_ram_title") }}</td>
                    <td>{{ $t('community_versions.' + currentSlug + '.req_ram_min') }}</td>
                    <td class="text-warning">{{ $t('community_versions.' + currentSlug + '.req_ram_rec') }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("community_versions.req_gpu_title") }}</td>
                    <td>{{ $t('community_versions.' + currentSlug + '.req_gpu_min') }}</td>
                    <td>{{ $t('community_versions.' + currentSlug + '.req_gpu_rec') }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("community_versions.req_disk_title") }}</td>
                    <td>{{ $t('community_versions.' + currentSlug + '.req_disk_min') }}</td>
                    <td>{{ $t('community_versions.' + currentSlug + '.req_disk_rec') }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("community_versions.req_screens_title") }}</td>
                    <td>{{ $t('community_versions.' + currentSlug + '.req_screens_min') }}</td>
                    <td class="text-warning">{{ $t('community_versions.' + currentSlug + '.req_screens_rec') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Changelog Section (Integrated with GitHub Releases) -->
      <div class="row">
        <div class="col-12">
          <div class="comm-card p-4 p-md-5">
            <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
              <div class="d-flex align-items-center gap-3" style="display: flex; gap: 12px; align-items: center;">
                <div class="faq-cta-icon">
                  <i class="fa fa-history"></i>
                </div>
                <h4 class="m-0 text-white font-weight-bold">{{ $t("community_versions.changelog_title") }}</h4>
              </div>

              <a
                v-if="versionRepoUrl"
                :href="versionRepoUrl"
                target="_blank"
                class="comm-release-github-btn"
              >
                <i class="fa fa-github"></i>
                <span>Ver todas no GitHub</span>
                <i class="fa fa-external-link ml-1" style="font-size: 11px;"></i>
              </a>
            </div>

            <!-- Loading State -->
            <div v-if="loadingReleases" class="py-4 text-center text-muted-custom">
              <i class="fa fa-circle-o-notch fa-spin text-warning mr-2" style="font-size: 20px;"></i>
              <span>Carregando histórico oficial do GitHub...</span>
            </div>

            <!-- Dynamic GitHub Releases -->
            <div v-else-if="releasesList.length > 0">
              <!-- Visible Releases (Initially only the latest release) -->
              <div
                v-for="rel in visibleReleases"
                :key="rel.id"
                class="comm-changelog-item"
              >
                <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                  <div class="d-flex align-items-center gap-2" style="display: flex; gap: 10px; align-items: center;">
                    <h5 class="text-warning font-weight-bold m-0" style="font-size: 19px;">{{ rel.name || rel.tag_name }}</h5>
                    <span v-if="rel.prerelease" class="comm-release-badge prerelease">Pré-lançamento</span>
                    <span v-else class="comm-release-badge stable">Estável</span>
                  </div>
                  <span class="help-count-badge">{{ formatReleaseDate(rel.published_at || rel.created_at) }}</span>
                </div>

                <!-- Formatted Release Markdown Body -->
                <div class="comm-release-body" v-html="formatReleaseBody(rel.body)"></div>

                <div class="mt-3">
                  <a
                    :href="rel.html_url"
                    target="_blank"
                    class="comm-release-github-btn"
                  >
                    <i class="fa fa-github"></i>
                    <span>Ver release no GitHub</span>
                    <i class="fa fa-external-link ml-1" style="font-size: 10px;"></i>
                  </a>
                </div>
              </div>

              <!-- Button to toggle previous releases -->
              <div v-if="releasesList.length > 1" class="text-center mt-4 pt-2">
                <button
                  type="button"
                  class="btn-all-topics d-inline-flex align-items-center gap-2"
                  @click="showAllReleases = !showAllReleases"
                  style="cursor: pointer; border: 1px solid rgba(251, 191, 36, 0.35); padding: 10px 22px;"
                >
                  <i :class="showAllReleases ? 'fa fa-chevron-up' : 'fa fa-history text-warning'"></i>
                  <span class="font-weight-bold">
                    {{
                      showAllReleases
                        ? $t("community_versions.hide_previous_releases")
                        : $t("community_versions.show_all_releases", { count: releasesList.length - 1 })
                    }}
                  </span>
                  <i :class="showAllReleases ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
                </button>
              </div>
            </div>

            <!-- Fallback Static Releases (if offline or no repo) -->
            <div v-else>
              <!-- Latest Release -->
              <div class="comm-changelog-item">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <h6 class="text-warning font-weight-bold m-0">{{ $t('community_versions.' + currentSlug + '.v1_title') }}</h6>
                  <span class="help-count-badge">{{ $t('community_versions.' + currentSlug + '.v1_date') }}</span>
                </div>
                <ul class="help-article-list mb-0" style="font-size: 13.5px;">
                  <li>{{ $t('community_versions.' + currentSlug + '.v1_item1') }}</li>
                  <li>{{ $t('community_versions.' + currentSlug + '.v1_item2') }}</li>
                  <li>{{ $t('community_versions.' + currentSlug + '.v1_item3') }}</li>
                </ul>
              </div>

              <!-- Previous Release -->
              <div class="comm-changelog-item">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <h6 class="text-muted font-weight-bold m-0">{{ $t('community_versions.' + currentSlug + '.v09_title') }}</h6>
                  <span class="help-count-badge">{{ $t('community_versions.' + currentSlug + '.v09_date') }}</span>
                </div>
                <ul class="help-article-list mb-0" style="font-size: 13.5px;">
                  <li>{{ $t('community_versions.' + currentSlug + '.v09_item1') }}</li>
                  <li>{{ $t('community_versions.' + currentSlug + '.v09_item2') }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox Modal Expandível (Fullscreen) -->
      <teleport to="body">
        <transition name="fade">
          <div
            v-if="lightboxOpen"
            class="comm-lightbox-backdrop"
            @click.self="closeLightbox"
          >
            <!-- Botão Fechar -->
            <button
              type="button"
              class="comm-lightbox-close"
              @click="closeLightbox"
              title="Fechar (Esc)"
            >
              <i class="fa fa-times"></i>
            </button>

            <!-- Botão Foto Anterior -->
            <button
              v-if="galleryPhotos.length > 1"
              type="button"
              class="comm-lightbox-nav prev"
              @click.stop="prevLightbox"
              title="Foto anterior (Seta esquerda)"
            >
              <i class="fa fa-chevron-left"></i>
            </button>

            <!-- Conteúdo da Imagem Expandida -->
            <div class="comm-lightbox-content" @click.self="closeLightbox">
              <img
                :src="galleryPhotos[lightboxIndex].src"
                :alt="'Screenshot ' + (lightboxIndex + 1)"
                class="comm-lightbox-img"
              />
              <div class="comm-lightbox-caption mt-3">
                <span>{{ lightboxIndex + 1 }} / {{ galleryPhotos.length }}</span>
              </div>
            </div>

            <!-- Botão Próxima Foto -->
            <button
              v-if="galleryPhotos.length > 1"
              type="button"
              class="comm-lightbox-nav next"
              @click.stop="nextLightbox"
              title="Próxima foto (Seta direita)"
            >
              <i class="fa fa-chevron-right"></i>
            </button>
          </div>
        </transition>
      </teleport>
    </div>
  </section>
</template>

<script>
import { versionMetadata, getVersionDownloads, activeVersions } from "@/versions";

// Auto-descoberta de imagens em src/versions/**/assets/ e src/assets/imgs/versions/
const versionAssetModules = {
  ...import.meta.glob("../versions/**/assets/*.{jpg,jpeg,png,webp,svg}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/imgs/versions/**/*.{jpg,jpeg,png,webp,svg}", {
    eager: true,
    import: "default",
  }),
};

export default {
  name: "CommunityDetails",
  props: {
    slug: {
      type: String,
      default: "flute",
    },
  },
  data() {
    return {
      lightboxOpen: false,
      lightboxIndex: 0,
      releasesList: [],
      loadingReleases: false,
      showAllReleases: false,
    };
  },
  watch: {
    slug() {
      this.lightboxOpen = false;
      this.lightboxIndex = 0;
      this.showAllReleases = false;
      this.loadReleases();
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
    this.loadReleases();
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  computed: {
    currentSlug() {
      return activeVersions.includes(this.slug?.toLowerCase())
        ? this.slug.toLowerCase()
        : "flute";
    },
    currentCodename() {
      return (
        versionMetadata[this.currentSlug]?.codename ||
        this.currentSlug.charAt(0).toUpperCase() + this.currentSlug.slice(1)
      );
    },
    currentVersionTag() {
      if (this.releasesList.length > 0) {
        return this.releasesList[0].tag_name;
      }
      return null;
    },
    visibleReleases() {
      if (this.showAllReleases) {
        return this.releasesList;
      }
      return this.releasesList.slice(0, 1);
    },
    versionRepoUrl() {
      return versionMetadata[this.currentSlug]?.releasesUrl || null;
    },
    currentMockup() {
      // 1. Procura foto com nome 'main' na pasta de assets da versão
      const mainImgEntry = Object.entries(versionAssetModules).find(
        ([path]) =>
          path.includes(`/${this.currentSlug}/`) &&
          /\/main\.(jpe?g|png|webp|svg)$/i.test(path)
      );
      if (mainImgEntry) {
        return mainImgEntry[1];
      }

      // 2. Fallback para mockup padrão registrado
      return (
        versionMetadata[this.currentSlug]?.mainImage ||
        versionMetadata.flute.mainImage
      );
    },
    galleryPhotos() {
      // Procura fotos numeradas (01, 02, 03...) e exclui a foto 'main'
      const matched = Object.entries(versionAssetModules)
        .filter(
          ([path]) =>
            path.includes(`/${this.currentSlug}/`) &&
            !/\/main\.(jpe?g|png|webp|svg)$/i.test(path)
        )
        .sort(([a], [b]) =>
          a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
        )
        .map(([path, src]) => ({
          src,
          path,
        }));

      return matched;
    },
    currentDownloads() {
      const baseDownloads = getVersionDownloads(
        this.currentSlug,
        (k) => this.$t(k)
      );

      // Se temos os dados da release do GitHub carregados com os assets reais
      if (this.releasesList.length > 0 && this.releasesList[0].assets) {
        const assets = this.releasesList[0].assets;

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
        const dmgIntel = findAsset(
          (a) =>
            a.name.endsWith(".dmg") &&
            !a.name.toLowerCase().includes("arm64")
        );
        const dmgArm = findAsset(
          (a) =>
            a.name.endsWith(".dmg") &&
            a.name.toLowerCase().includes("arm64")
        );
        const exe = findAsset((a) => a.name.endsWith(".exe"));

        return baseDownloads.map((group) => {
          const links = group.links.map((link) => {
            let matched = null;
            if (link.label.includes(".AppImage") && appImage) {
              matched = appImage;
            } else if (link.label.includes(".deb") && deb) {
              matched = deb;
            } else if (link.label.includes(".rpm") && rpm) {
              matched = rpm;
            } else if (link.label.includes("Intel") && dmgIntel) {
              matched = dmgIntel;
            } else if (
              (link.label.includes("Silicon") ||
                link.label.includes("ARM64")) &&
              dmgArm
            ) {
              matched = dmgArm;
            } else if (link.label.includes(".exe") && exe) {
              matched = exe;
            }

            if (matched) {
              return {
                ...link,
                url: matched.url,
                size: matched.size,
              };
            }
            return link;
          });

          return {
            ...group,
            links,
          };
        });
      }

      return baseDownloads;
    },
  },
  methods: {
    async loadReleases() {
      const repo = versionMetadata[this.currentSlug]?.repo;
      if (!repo) {
        this.releasesList = [];
        return;
      }

      this.loadingReleases = true;
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=10`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            this.releasesList = data;
          }
        }
      } catch (err) {
        console.warn("Erro ao carregar releases do GitHub:", err);
      } finally {
        this.loadingReleases = false;
      }
    },
    formatReleaseDate(isoDate) {
      if (!isoDate) return "";
      try {
        const d = new Date(isoDate);
        const locale = this.$i18n.locale === "es" ? "es-ES" : "pt-BR";
        return d.toLocaleDateString(locale, {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      } catch {
        return isoDate;
      }
    },
    formatReleaseBody(body) {
      if (!body) return "";

      const lines = body.split(/\r?\n/);
      let html = "";
      let inList = false;
      let inSublist = false;

      const escapeHtml = (str) =>
        str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

      const formatInline = (str) => {
        let s = escapeHtml(str);
        // Code `code`
        s = s.replace(/`([^`]+)`/g, '<code class="comm-inline-code">$1</code>');
        // Bold **text**
        s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
        // Italic *text*
        s = s.replace(/(^|[^\*])\*([^\*]+)\*([^\*]|$)/g, "$1<em>$2</em>$3");
        // Links [text](url)
        s = s.replace(
          /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
          '<a href="$2" target="_blank" rel="noopener" class="text-warning text-decoration-underline">$1</a>'
        );
        return s;
      };

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Headings ### Title
        if (/^###\s+(.*)/.test(line)) {
          if (inSublist) {
            html += "</ul>";
            inSublist = false;
          }
          if (inList) {
            html += "</ul>";
            inList = false;
          }
          const title = line.replace(/^###\s+/, "");
          html += `<h6 class="comm-release-heading">${formatInline(title)}</h6>`;
          continue;
        }

        // Headings ## Title
        if (/^##\s+(.*)/.test(line)) {
          if (inSublist) {
            html += "</ul>";
            inSublist = false;
          }
          if (inList) {
            html += "</ul>";
            inList = false;
          }
          const title = line.replace(/^##\s+/, "");
          html += `<h5 class="comm-release-heading">${formatInline(title)}</h5>`;
          continue;
        }

        // Nested sub-bullet (indented with 2+ spaces or tab)
        if (/^(\s{2,}|\t)[*-]\s+(.*)/.test(line)) {
          const content = line.replace(/^(\s{2,}|\t)[*-]\s+/, "");
          if (!inList) {
            html += '<ul class="comm-release-list">';
            inList = true;
          }
          if (!inSublist) {
            html += '<ul class="comm-release-sublist">';
            inSublist = true;
          }
          html += `<li class="comm-release-subitem">${formatInline(content)}</li>`;
          continue;
        }

        // Primary bullet item
        if (/^[*-]\s+(.*)/.test(line)) {
          if (inSublist) {
            html += "</ul>";
            inSublist = false;
          }
          if (!inList) {
            html += '<ul class="comm-release-list">';
            inList = true;
          }
          const content = line.replace(/^[*-]\s+/, "");
          html += `<li class="comm-release-item-li">${formatInline(content)}</li>`;
          continue;
        }

        // Empty line
        if (line.trim() === "") {
          if (inSublist) {
            html += "</ul>";
            inSublist = false;
          }
          continue;
        }

        // Regular paragraph
        if (inSublist) {
          html += "</ul>";
          inSublist = false;
        }
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<p class="comm-release-p">${formatInline(line)}</p>`;
      }

      if (inSublist) {
        html += "</ul>";
      }
      if (inList) {
        html += "</ul>";
      }

      return html;
    },
    openLightbox(index) {
      this.lightboxIndex = index;
      this.lightboxOpen = true;
      document.body.style.overflow = "hidden";
    },
    closeLightbox() {
      this.lightboxOpen = false;
      document.body.style.overflow = "";
    },
    prevLightbox() {
      if (this.galleryPhotos.length <= 1) return;
      this.lightboxIndex =
        (this.lightboxIndex - 1 + this.galleryPhotos.length) %
        this.galleryPhotos.length;
    },
    nextLightbox() {
      if (this.galleryPhotos.length <= 1) return;
      this.lightboxIndex =
        (this.lightboxIndex + 1) % this.galleryPhotos.length;
    },
    handleKeyDown(e) {
      if (!this.lightboxOpen) return;
      if (e.key === "Escape") {
        this.closeLightbox();
      } else if (e.key === "ArrowLeft") {
        this.prevLightbox();
      } else if (e.key === "ArrowRight") {
        this.nextLightbox();
      }
    },
  },
};
</script>
