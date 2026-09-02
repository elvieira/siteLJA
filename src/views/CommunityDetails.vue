<template>
  <section class="community-details-page spad set-bg" :style="versionData?.themeStyles">
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

      <!-- Loading State -->
      <div v-if="loading" class="row py-5 text-center">
        <div class="col-12">
          <i class="fa fa-circle-o-notch fa-spin text-warning mb-3" style="font-size: 36px;"></i>
          <p class="text-muted-custom">Carregando dados da versão a partir do repositório...</p>
        </div>
      </div>

      <!-- Main Version Content -->
      <div v-else-if="versionData">
        <!-- Header Hero -->
        <div class="row mb-4">
          <div class="col-lg-10">
            <div class="d-flex align-items-center gap-3 mb-4" style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
              <div class="version-logo">
                <div class="text-logo p-0" style="font-size: 32px; letter-spacing: -0.02em;">
                  {{ $t("logo.text-normal") }}
                  <span>JA</span>
                </div>
                <span
                  class="codename-badge"
                  :style="{
                    ...getBadgeStyle(versionData.color),
                    fontSize: '14px',
                    padding: '4px 14px'
                  }"
                >
                  {{ versionData.codename }}
                </span>
              </div>
              <span class="help-count-badge" style="font-size: 13px; padding: 4px 12px;">
                {{ versionData.versionTag }}
              </span>
            </div>
            <p class="lead text-muted-custom mb-0" style="font-size: 18px; line-height: 1.7;">
              {{ getVersionText('overview_desc') }}
            </p>
          </div>
        </div>

        <!-- 1. Foto Principal (Fixa e Independente) -->
        <div class="row mb-5">
          <div class="col-12">
            <div class="comm-card p-2 p-md-3 overflow-hidden text-center" style="border-radius: 18px;">
              <img
                :src="versionData.mainImage"
                :alt="'Louvor JA ' + versionData.codename"
                class="img-fluid"
                style="border-radius: 12px; width: 100%; max-height: 540px; object-fit: cover;"
              />
            </div>
          </div>
        </div>

        <!-- 2. Galeria de Fotos Pequenas Distribuídas Uniformemente (Abaixo da foto principal) -->
        <div v-if="versionData.galleryPhotos && versionData.galleryPhotos.length > 0" class="row mb-5">
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
                  v-for="(photo, pIdx) in versionData.galleryPhotos"
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
            class="col-xl-4 col-md-6 mb-4"
          >
            <div
              :class="[
                'comm-card justify-content-between p-4 h-100',
                { 'comm-card--recommended': isPlatformRecommended(platform) }
              ]"
            >
              <!-- Badge flutuando no canto superior direito sobre a linha do card -->
              <span
                v-if="isPlatformRecommended(platform)"
                class="comm-card-rec-ribbon"
                :title="$t('community_versions.dl_recommended_for_you') || 'Recomendado para o seu sistema'"
              >
                <i class="fa fa-star"></i> {{ $t("community_versions.dl_recommended") || "Recomendado" }}
              </span>

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
                  :class="[
                    'btn-download-action',
                    { 'btn-download-action--recommended': isLinkRecommended(platform, link) }
                  ]"
                  :title="link.label"
                >
                  <div class="dl-btn-left">
                    <i :class="link.icon || 'fa fa-download'"></i>
                    <span :title="link.label">{{ link.label }}</span>
                  </div>
                  <div class="d-flex align-items-center gap-2" style="display: flex; align-items: center; gap: 6px; margin-left: auto; flex-shrink: 0;">
                    <span
                      v-if="isLinkRecommended(platform, link)"
                      class="dl-btn-recommended-tag"
                      :title="$t('community_versions.dl_recommended') || 'Recomendado'"
                    >
                      <i class="fa fa-star"></i>
                    </span>
                    <span v-if="link.size" class="dl-btn-badge">{{ link.size }}</span>
                  </div>
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
                <i :class="getVersionText('feature1_icon') || 'fa fa-database'"></i>
              </div>
              <h5 class="text-white font-weight-bold mb-2">{{ getVersionText('feature1_title') }}</h5>
              <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ getVersionText('feature1_desc') }}</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mb-4">
            <div class="comm-card p-4">
              <div class="faq-cta-icon mb-3">
                <i :class="getVersionText('feature2_icon') || 'fa fa-desktop'"></i>
              </div>
              <h5 class="text-white font-weight-bold mb-2">{{ getVersionText('feature2_title') }}</h5>
              <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ getVersionText('feature2_desc') }}</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mb-4">
            <div class="comm-card p-4">
              <div class="faq-cta-icon mb-3">
                <i :class="getVersionText('feature3_icon') || 'fa fa-bolt'"></i>
              </div>
              <h5 class="text-white font-weight-bold mb-2">{{ getVersionText('feature3_title') }}</h5>
              <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ getVersionText('feature3_desc') }}</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mb-4">
            <div class="comm-card p-4">
              <div class="faq-cta-icon mb-3">
                <i :class="getVersionText('feature4_icon') || 'fa fa-check-circle'"></i>
              </div>
              <h5 class="text-white font-weight-bold mb-2">{{ getVersionText('feature4_title') }}</h5>
              <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ getVersionText('feature4_desc') }}</p>
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
                      <td>{{ getVersionText('req_os_min') }}</td>
                      <td class="text-warning">{{ getVersionText('req_os_rec') }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t("community_versions.req_cpu_title") }}</td>
                      <td>{{ getVersionText('req_cpu_min') }}</td>
                      <td>{{ getVersionText('req_cpu_rec') }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t("community_versions.req_ram_title") }}</td>
                      <td>{{ getVersionText('req_ram_min') }}</td>
                      <td class="text-warning">{{ getVersionText('req_ram_rec') }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t("community_versions.req_gpu_title") }}</td>
                      <td>{{ getVersionText('req_gpu_min') }}</td>
                      <td>{{ getVersionText('req_gpu_rec') }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t("community_versions.req_disk_title") }}</td>
                      <td>{{ getVersionText('req_disk_min') }}</td>
                      <td>{{ getVersionText('req_disk_rec') }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t("community_versions.req_screens_title") }}</td>
                      <td>{{ getVersionText('req_screens_min') }}</td>
                      <td class="text-warning">{{ getVersionText('req_screens_rec') }}</td>
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
              </div>

              <!-- Dynamic GitHub Releases -->
              <div v-if="versionData.releases && versionData.releases.length > 0">
                <!-- Visible Releases (Initially only the latest release) -->
                <div
                  v-for="(rel, rIdx) in visibleReleases"
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

                  <!-- Compact Downloads (Apenas nas versões anteriores à atual) -->
                  <div
                    v-if="rIdx > 0 && getReleaseDownloads(rel).length > 0"
                    class="comm-prev-release-dls mt-3 pt-3"
                  >
                    <div class="d-flex align-items-center gap-2 mb-2">
                      <i class="fa fa-download text-warning" style="font-size: 12px;"></i>
                      <span class="text-muted-custom font-weight-bold" style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em;">
                        {{ $t("community_versions.prev_release_downloads") || "Downloads desta versão:" }}
                      </span>
                    </div>
                    <div class="d-flex flex-wrap gap-2" style="display: flex; flex-wrap: wrap; gap: 8px;">
                      <a
                        v-for="(dl, dIdx) in getReleaseDownloads(rel)"
                        :key="dIdx"
                        :href="dl.url"
                        target="_blank"
                        class="comm-prev-dl-btn"
                        :title="dl.name"
                      >
                        <i :class="dl.icon"></i>
                        <span>{{ dl.label }}</span>
                        <span v-if="dl.size" class="comm-prev-dl-size">{{ dl.size }}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Button to toggle previous releases -->
                <div v-if="versionData.releases.length > 1" class="text-center mt-4 pt-2">
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
                          : $t("community_versions.show_all_releases", { count: versionData.releases.length - 1 })
                      }}
                    </span>
                    <i :class="showAllReleases ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
                  </button>
                </div>
              </div>

              <!-- Fallback Static Releases (if offline or no releases on repo) -->
              <div v-else>
                <!-- Latest Release -->
                <div class="comm-changelog-item">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <h6 class="text-warning font-weight-bold m-0">{{ getVersionText('v1_title') }}</h6>
                    <span class="help-count-badge">{{ getVersionText('v1_date') }}</span>
                  </div>
                  <ul class="help-article-list mb-0" style="font-size: 13.5px;">
                    <li v-if="getVersionText('v1_item1')">{{ getVersionText('v1_item1') }}</li>
                    <li v-if="getVersionText('v1_item2')">{{ getVersionText('v1_item2') }}</li>
                    <li v-if="getVersionText('v1_item3')">{{ getVersionText('v1_item3') }}</li>
                  </ul>
                </div>

                <!-- Previous Release -->
                <div v-if="getVersionText('v09_title')" class="comm-changelog-item">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <h6 class="text-muted font-weight-bold m-0">{{ getVersionText('v09_title') }}</h6>
                    <span class="help-count-badge">{{ getVersionText('v09_date') }}</span>
                  </div>
                  <ul class="help-article-list mb-0" style="font-size: 13.5px;">
                    <li v-if="getVersionText('v09_item1')">{{ getVersionText('v09_item1') }}</li>
                    <li v-if="getVersionText('v09_item2')">{{ getVersionText('v09_item2') }}</li>
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
              v-if="lightboxOpen && versionData.galleryPhotos && versionData.galleryPhotos.length > 0"
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
                v-if="versionData.galleryPhotos.length > 1"
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
                  :src="versionData.galleryPhotos[lightboxIndex].src"
                  :alt="'Screenshot ' + (lightboxIndex + 1)"
                  class="comm-lightbox-img"
                />
                <div class="comm-lightbox-caption mt-3">
                  <span>{{ lightboxIndex + 1 }} / {{ versionData.galleryPhotos.length }}</span>
                </div>
              </div>

              <!-- Botão Próxima Foto -->
              <button
                v-if="versionData.galleryPhotos.length > 1"
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

      <!-- Not Found State -->
      <div v-else class="row py-5 text-center">
        <div class="col-12">
          <h4 class="text-warning mb-3">Versão não encontrada</h4>
          <p class="text-muted-custom mb-4">Não foi possível carregar os dados desta versão a partir do repositório.</p>
          <router-link :to="{ name: 'community' }" class="btn-all-topics d-inline-flex">
            <i class="fa fa-arrow-left"></i>
            <span>Voltar para a Comunidade</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  registeredVersions,
  loadCommunityVersion,
  getVersionDownloads,
  detectUserPlatform,
  injectRemoteTranslations,
  hexToRgba,
  getBadgeStyle,
} from "@/versions";

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
      versionData: null,
      loading: true,
      lightboxOpen: false,
      lightboxIndex: 0,
      showAllReleases: false,
      userPlatform: { os: null, arch: null },
    };
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale || "pt";
    },
    currentDownloads() {
      if (!this.versionData) return [];
      return getVersionDownloads(this.versionData, (k) => this.$t(k));
    },
    visibleReleases() {
      if (!this.versionData?.releases) return [];
      if (this.showAllReleases) {
        return this.versionData.releases;
      }
      return this.versionData.releases.slice(0, 1);
    },
  },
  watch: {
    slug() {
      this.lightboxOpen = false;
      this.lightboxIndex = 0;
      this.showAllReleases = false;
      this.fetchVersionDetails();
    },
  },
  async mounted() {
    this.userPlatform = detectUserPlatform();
    window.addEventListener("keydown", this.handleKeyDown);
    await this.fetchVersionDetails();
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  methods: {
    hexToRgba,
    getBadgeStyle,
    isPlatformRecommended(platform) {
      if (!this.userPlatform || !this.userPlatform.os) return false;
      return platform.key === this.userPlatform.os;
    },
    isLinkRecommended(platform, link) {
      if (!this.isPlatformRecommended(platform)) return false;

      // Windows: .exe é o recomendado padrão
      if (platform.key === "windows") {
        return link.ext === "exe";
      }

      // macOS: Se Apple Silicon (ARM) detectado, recomenda ARM; se Intel, recomenda Intel
      if (platform.key === "mac") {
        if (this.userPlatform.arch === "arm") {
          return link.isArm === true;
        } else if (this.userPlatform.arch === "intel") {
          return link.isArm === false;
        }
        return link.isArm === true;
      }

      // Linux: .AppImage é o formato universal recomendado
      if (platform.key === "linux") {
        return link.ext === "appimage";
      }

      return false;
    },
    getReleaseDownloads(rel) {
      if (!rel || !Array.isArray(rel.assets)) return [];
      const ignoredExts = [
        ".blockmap",
        ".yml",
        ".yaml",
        ".sha256",
        ".sha512",
        ".md5",
        ".json",
        ".txt",
        ".asc",
      ];
      let assets = rel.assets.filter((a) => {
        const n = (a.name || "").toLowerCase();
        return !ignoredExts.some((ext) => n.endsWith(ext));
      });

      const hasDmg = assets.some((a) => (a.name || "").toLowerCase().endsWith(".dmg"));
      if (hasDmg) {
        assets = assets.filter((a) => !(a.name || "").toLowerCase().endsWith("-mac.zip"));
      }

      return assets.map((a) => {
        const n = (a.name || "").toLowerCase();
        let icon = "fa fa-download";
        let label = a.name;
        const isArm = n.includes("arm64") || n.includes("aarch64") || n.includes("-arm");

        if (n.endsWith(".exe")) {
          icon = "fa fa-windows";
          label = ".exe";
        } else if (n.endsWith(".msi")) {
          icon = "fa fa-windows";
          label = ".msi";
        } else if (n.endsWith(".dmg")) {
          icon = "fa fa-apple";
          label = isArm ? ".dmg (ARM)" : ".dmg (Intel)";
        } else if (n.endsWith(".pkg")) {
          icon = "fa fa-apple";
          label = isArm ? ".pkg (ARM)" : ".pkg (Intel)";
        } else if (n.endsWith(".appimage")) {
          icon = "fa fa-linux";
          label = ".AppImage";
        } else if (n.endsWith(".deb")) {
          icon = "fa fa-linux";
          label = ".deb";
        } else if (n.endsWith(".rpm")) {
          icon = "fa fa-linux";
          label = ".rpm";
        } else if (n.endsWith(".tar.gz") || n.endsWith(".tar.xz")) {
          icon = "fa fa-linux";
          label = ".tar.gz";
        } else if (n.endsWith(".zip")) {
          icon = "fa fa-file-archive-o";
          label = ".zip";
        }

        const sizeMb = a.size ? (a.size / (1024 * 1024)).toFixed(0) + " MB" : "";
        return {
          url: a.browser_download_url,
          name: a.name,
          label,
          icon,
          size: sizeMb,
        };
      });
    },
    async fetchVersionDetails() {
      this.loading = true;
      const targetSlug = (this.slug || "flute").toLowerCase();

      try {
        const data = await loadCommunityVersion(targetSlug);
        this.versionData = data;
        if (data) {
          injectRemoteTranslations(this.$i18n, [data]);
        }
      } catch (err) {
        console.error("Erro ao carregar detalhes da versão:", err);
      } finally {
        this.loading = false;
      }
    },
    getVersionText(field) {
      if (!this.versionData) return "";
      const loc = this.currentLocale;
      const trans = this.versionData.translations;
      if (!trans) return "";
      return trans[loc]?.[field] || trans.pt?.[field] || trans.es?.[field] || "";
    },
    formatReleaseDate(isoDate) {
      if (!isoDate) return "";
      try {
        const d = new Date(isoDate);
        const locale = this.currentLocale === "es" ? "es-ES" : "pt-BR";
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
        s = s.replace(/`([^`]+)`/g, '<code class="comm-inline-code">$1</code>');
        s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
        s = s.replace(/(^|[^\*])\*([^\*]+)\*([^\*]|$)/g, "$1<em>$2</em>$3");
        s = s.replace(
          /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
          '<a href="$2" target="_blank" rel="noopener" class="text-warning text-decoration-underline">$1</a>'
        );
        return s;
      };

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

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

        if (line.trim() === "") {
          if (inSublist) {
            html += "</ul>";
            inSublist = false;
          }
          continue;
        }

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
      if (!this.versionData?.galleryPhotos || this.versionData.galleryPhotos.length <= 1) return;
      this.lightboxIndex =
        (this.lightboxIndex - 1 + this.versionData.galleryPhotos.length) %
        this.versionData.galleryPhotos.length;
    },
    nextLightbox() {
      if (!this.versionData?.galleryPhotos || this.versionData.galleryPhotos.length <= 1) return;
      this.lightboxIndex =
        (this.lightboxIndex + 1) % this.versionData.galleryPhotos.length;
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
