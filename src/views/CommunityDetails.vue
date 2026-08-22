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
      <div class="row mb-5">
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
              {{ $t('community_versions.' + currentSlug + '.version') }}
            </span>
          </div>
          <p class="lead text-muted-custom mb-0" style="font-size: 18px; line-height: 1.7;">
            {{ $t('community_versions.' + currentSlug + '.overview_desc') }}
          </p>
        </div>
      </div>

      <!-- App Visual Mockup (Dedicated per version) -->
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

      <!-- Changelog -->
      <div class="row">
        <div class="col-12">
          <div class="comm-card p-4 p-md-5">
            <div class="d-flex align-items-center gap-3 mb-4" style="display: flex; gap: 12px; align-items: center;">
              <div class="faq-cta-icon">
                <i class="fa fa-history"></i>
              </div>
              <h4 class="m-0 text-white font-weight-bold">{{ $t("community_versions.changelog_title") }}</h4>
            </div>

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
  </section>
</template>

<script>
import violinMockup from "@/assets/imgs/community-violin.jpg";
import pianoMockup from "@/assets/imgs/community-piano.jpg";
import fluteMockup from "@/assets/imgs/community-flute.jpg";

export default {
  name: "CommunityDetails",
  props: {
    slug: {
      type: String,
      default: "flute",
    },
  },
  computed: {
    currentSlug() {
      const allowed = ["violin", "piano", "flute"];
      return allowed.includes(this.slug?.toLowerCase())
        ? this.slug.toLowerCase()
        : "flute";
    },
    currentCodename() {
      const names = {
        violin: "Violin",
        piano: "Piano",
        flute: "Flute",
      };
      return names[this.currentSlug] || "Flute";
    },
    currentMockup() {
      const mockups = {
        violin: violinMockup,
        piano: pianoMockup,
        flute: fluteMockup,
      };
      return mockups[this.currentSlug] || fluteMockup;
    },
    currentDownloads() {
      const t = (key) => this.$t(key);
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
                size: "85 MB",
                url: "https://github.com/louvorja",
              },
              {
                label: t("community_versions.dl_linux_deb"),
                icon: "fa fa-download",
                size: "78 MB",
                url: "https://github.com/louvorja",
              },
              {
                label: t("community_versions.dl_linux_rpm"),
                icon: "fa fa-download",
                size: "80 MB",
                url: "https://github.com/louvorja",
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
                size: "92 MB",
                url: "https://github.com/louvorja",
              },
              {
                label: t("community_versions.dl_mac_dmg_arm"),
                icon: "fa fa-download",
                size: "88 MB",
                url: "https://github.com/louvorja",
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
                size: "80 MB",
                url: "https://github.com/louvorja",
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
      return configs[this.currentSlug] || configs.flute;
    },
  },
};
</script>
