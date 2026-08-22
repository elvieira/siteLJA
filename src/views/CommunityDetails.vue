<template>
  <section class="community-details-page spad set-bg">
    <div class="container text-white">
      <!-- Back Navigation -->
      <div class="row mb-4">
        <div class="col-12">
          <router-link :to="{ name: 'community' }" class="help-back-link">
            <i class="fa fa-arrow-left"></i>
            <span>{{ $t("community_details.back_btn") }}</span>
          </router-link>
        </div>
      </div>

      <!-- Header Hero -->
      <div class="row align-items-center mb-5">
        <div class="col-lg-8">
          <div class="d-flex align-items-center gap-3 mb-3" style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <div class="version-logo">
              <div class="text-logo p-0" style="font-size: 22px;">
                {{ $t("logo.text-normal") }}
                <span>JA</span>
              </div>
              <span class="codename-badge" :class="'codename-' + currentSlug">
                {{ currentCodename }}
              </span>
            </div>
            <span class="help-count-badge">{{ $t("community_details.tag_electron") }}</span>
          </div>
          <h2 class="font-weight-bold mb-3">{{ currentTitle }}</h2>
          <p class="lead text-muted-custom mb-4">{{ $t("community_details.overview_desc") }}</p>
          <div class="d-flex gap-2 flex-wrap" style="display: flex; gap: 8px; flex-wrap: wrap;">
            <span class="platform-pill"><i class="fa fa-linux"></i> Linux</span>
            <span class="platform-pill"><i class="fa fa-apple"></i> macOS</span>
            <span class="platform-pill"><i class="fa fa-windows"></i> Windows</span>
            <span class="platform-pill"><i class="fa fa-cube"></i> Electron 30+</span>
            <span class="platform-pill"><i class="fa fa-wifi"></i> 100% Offline</span>
          </div>
        </div>
        <div class="col-lg-4 mt-4 mt-lg-0 text-lg-right">
          <a href="#downloads-section" class="site-btn" style="padding: 14px 28px; display: inline-flex; align-items: center; gap: 10px;">
            <i class="fa fa-download"></i>
            <span>{{ $t("community.btn_repo") }}</span>
          </a>
        </div>
      </div>

      <!-- Pure Desktop App Visual Mockup -->
      <div class="row mb-5">
        <div class="col-12">
          <div class="comm-card p-2 p-md-3 overflow-hidden text-center" style="border-radius: 18px;">
            <img
              src="@/assets/imgs/003-community.jpg"
              alt="Louvor JA Desktop Multiplataforma"
              class="img-fluid"
              style="border-radius: 12px; width: 100%; max-height: 520px; object-fit: cover;"
            />
          </div>
        </div>
      </div>

      <!-- Downloads Section -->
      <div id="downloads-section" class="row mb-5 pt-3">
        <div class="col-12 mb-4">
          <div class="section-title text-left mb-2">
            <h2>{{ $t("community_details.downloads_title") }}</h2>
          </div>
          <p class="text-muted-custom">{{ $t("community_details.downloads_subtitle") }}</p>
        </div>

        <!-- 1. Linux Download Card -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="comm-card justify-content-between p-4">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center gap-2" style="display: flex; gap: 10px; align-items: center;">
                  <i class="fa fa-linux text-warning" style="font-size: 28px;"></i>
                  <h5 class="m-0 text-white font-weight-bold">{{ $t("community_details.dl_linux_title") }}</h5>
                </div>
                <span class="help-count-badge">x86_64</span>
              </div>
              <p class="text-muted-custom mb-4" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community_details.dl_linux_desc") }}</p>
            </div>
            <div class="d-flex flex-column gap-2" style="display: flex; flex-direction: column; gap: 10px;">
              <a
                href="https://github.com/louvorja"
                target="_blank"
                class="btn-all-topics"
              >
                <i class="fa fa-download"></i>
                <span>{{ $t("community_details.dl_linux_appimage") }}</span>
                <span class="badge badge-dark ml-auto" style="background: rgba(255,255,255,0.1);">85 MB</span>
              </a>
              <a
                href="https://github.com/louvorja"
                target="_blank"
                class="btn-all-topics"
              >
                <i class="fa fa-download"></i>
                <span>{{ $t("community_details.dl_linux_deb") }}</span>
                <span class="badge badge-dark ml-auto" style="background: rgba(255,255,255,0.1);">78 MB</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 2. macOS Download Card -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="comm-card justify-content-between p-4">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center gap-2" style="display: flex; gap: 10px; align-items: center;">
                  <i class="fa fa-apple text-warning" style="font-size: 28px;"></i>
                  <h5 class="m-0 text-white font-weight-bold">{{ $t("community_details.dl_mac_title") }}</h5>
                </div>
                <span class="help-count-badge">Universal</span>
              </div>
              <p class="text-muted-custom mb-4" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community_details.dl_mac_desc") }}</p>
            </div>
            <div class="d-flex flex-column gap-2" style="display: flex; flex-direction: column; gap: 10px;">
              <a
                href="https://github.com/louvorja"
                target="_blank"
                class="btn-all-topics"
              >
                <i class="fa fa-download"></i>
                <span>{{ $t("community_details.dl_mac_dmg") }}</span>
                <span class="badge badge-dark ml-auto" style="background: rgba(255,255,255,0.1);">92 MB</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 3. Windows Download Card -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="comm-card justify-content-between p-4">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center gap-2" style="display: flex; gap: 10px; align-items: center;">
                  <i class="fa fa-windows text-warning" style="font-size: 28px;"></i>
                  <h5 class="m-0 text-white font-weight-bold">{{ $t("community_details.dl_win_title") }}</h5>
                </div>
                <span class="help-count-badge">Win 10/11</span>
              </div>
              <p class="text-muted-custom mb-4" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community_details.dl_win_desc") }}</p>
            </div>
            <div class="d-flex flex-column gap-2" style="display: flex; flex-direction: column; gap: 10px;">
              <a
                href="https://github.com/louvorja"
                target="_blank"
                class="btn-all-topics"
              >
                <i class="fa fa-download"></i>
                <span>{{ $t("community_details.dl_win_exe") }}</span>
                <span class="badge badge-dark ml-auto" style="background: rgba(255,255,255,0.1);">80 MB</span>
              </a>
              <a
                href="https://github.com/louvorja"
                target="_blank"
                class="btn-all-topics"
              >
                <i class="fa fa-file-archive-o"></i>
                <span>{{ $t("community_details.dl_win_portable") }}</span>
                <span class="badge badge-dark ml-auto" style="background: rgba(255,255,255,0.1);">84 MB</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Grid (4 Cards) -->
      <div class="row mb-5">
        <div class="col-12 mb-4">
          <div class="section-title text-left mb-2">
            <h2>{{ $t("community_details.features_title") }}</h2>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <div class="comm-card p-4">
            <div class="faq-cta-icon mb-3">
              <i class="fa fa-database"></i>
            </div>
            <h5 class="text-white font-weight-bold mb-2">{{ $t("community_details.feature1_title") }}</h5>
            <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community_details.feature1_desc") }}</p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <div class="comm-card p-4">
            <div class="faq-cta-icon mb-3">
              <i class="fa fa-desktop"></i>
            </div>
            <h5 class="text-white font-weight-bold mb-2">{{ $t("community_details.feature2_title") }}</h5>
            <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community_details.feature2_desc") }}</p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <div class="comm-card p-4">
            <div class="faq-cta-icon mb-3">
              <i class="fa fa-keyboard-o"></i>
            </div>
            <h5 class="text-white font-weight-bold mb-2">{{ $t("community_details.feature3_title") }}</h5>
            <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community_details.feature3_desc") }}</p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 mb-4">
          <div class="comm-card p-4">
            <div class="faq-cta-icon mb-3">
              <i class="fa fa-check-circle"></i>
            </div>
            <h5 class="text-white font-weight-bold mb-2">{{ $t("community_details.feature4_title") }}</h5>
            <p class="text-muted-custom m-0" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community_details.feature4_desc") }}</p>
          </div>
        </div>
      </div>

      <!-- System Requirements & Changelog (2 Columns) -->
      <div class="row">
        <!-- System Requirements -->
        <div class="col-lg-6 mb-4 mb-lg-0">
          <div class="comm-card p-4 p-md-5">
            <div class="d-flex align-items-center gap-3 mb-4" style="display: flex; gap: 12px; align-items: center;">
              <div class="faq-cta-icon">
                <i class="fa fa-cogs"></i>
              </div>
              <h4 class="m-0 text-white font-weight-bold">{{ $t("community_details.requirements_title") }}</h4>
            </div>
            <ul class="comm-req-list">
              <li>
                <i class="fa fa-linux text-warning"></i>
                <span>{{ $t("community_details.req_linux") }}</span>
              </li>
              <li>
                <i class="fa fa-apple text-warning"></i>
                <span>{{ $t("community_details.req_mac") }}</span>
              </li>
              <li>
                <i class="fa fa-windows text-warning"></i>
                <span>{{ $t("community_details.req_win") }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Changelog -->
        <div class="col-lg-6">
          <div class="comm-card p-4 p-md-5">
            <div class="d-flex align-items-center gap-3 mb-4" style="display: flex; gap: 12px; align-items: center;">
              <div class="faq-cta-icon">
                <i class="fa fa-history"></i>
              </div>
              <h4 class="m-0 text-white font-weight-bold">{{ $t("community_details.changelog_title") }}</h4>
            </div>

            <!-- v1.0.0 Beta -->
            <div class="comm-changelog-item">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h6 class="text-warning font-weight-bold m-0">{{ $t("community_details.v1_title") }}</h6>
                <span class="help-count-badge">{{ $t("community_details.v1_date") }}</span>
              </div>
              <ul class="help-article-list mb-0" style="font-size: 13.5px;">
                <li>{{ $t("community_details.v1_item1") }}</li>
                <li>{{ $t("community_details.v1_item2") }}</li>
                <li>{{ $t("community_details.v1_item3") }}</li>
              </ul>
            </div>

            <!-- v0.9.5 Alpha -->
            <div class="comm-changelog-item">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <h6 class="text-muted font-weight-bold m-0">{{ $t("community_details.v09_title") }}</h6>
                <span class="help-count-badge">{{ $t("community_details.v09_date") }}</span>
              </div>
              <ul class="help-article-list mb-0" style="font-size: 13.5px;">
                <li>{{ $t("community_details.v09_item1") }}</li>
                <li>{{ $t("community_details.v09_item2") }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CommunityDetails",
  props: {
    slug: {
      type: String,
      default: "electron",
    },
  },
  computed: {
    currentSlug() {
      const allowed = ["violin", "piano", "flute", "sax", "cello", "harp"];
      return allowed.includes(this.slug?.toLowerCase())
        ? this.slug.toLowerCase()
        : "violin";
    },
    currentCodename() {
      const names = {
        violin: "Violin",
        piano: "Piano",
        flute: "Flute",
        sax: "Sax",
        cello: "Cello",
        harp: "Harp",
        electron: "Electron",
      };
      return names[this.currentSlug] || "Electron";
    },
    currentTitle() {
      return `Louvor JA ${this.currentCodename} (Desktop Multiplataforma)`;
    },
  },
};
</script>
