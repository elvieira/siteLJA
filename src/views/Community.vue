<template>
  <section class="community-page spad set-bg">
    <div class="container text-white">
      <!-- Section Header -->
      <div class="row mb-5">
        <div class="col-lg-8">
          <div class="section-title text-left mb-3">
            <h2>{{ $t("community.title") }}</h2>
          </div>
          <h4 class="mb-3 text-warning">{{ $t("community.subtitle") }}</h4>
          <p class="lead text-muted-custom">{{ $t("community.description") }}</p>
        </div>
      </div>

      <!-- Versions Grid: 3 Active Versions (Violin, Piano, Flute) -->
      <div class="row mb-5">
        <!-- 1. Louvor JA Violin -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="contact-card h-100 d-flex flex-column justify-content-between p-3 p-md-4">
            <div>
              <!-- Version Preview Cover (Main Image) -->
              <router-link
                :to="{ name: 'community-details', params: { slug: 'violin' } }"
                class="d-block comm-card-cover mb-3 overflow-hidden"
                style="border-radius: 12px; height: 180px;"
              >
                <img
                  :src="getVersionMainImage('violin')"
                  alt="Louvor JA Violin"
                  class="img-fluid w-100 h-100"
                  style="object-fit: cover; transition: transform 0.4s ease;"
                />
              </router-link>

              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="version-logo">
                  <div class="text-logo p-0" style="font-size: 18px;">
                    {{ $t("logo.text-normal") }}
                    <span>JA</span>
                  </div>
                  <span class="codename-badge codename-violin">Violin</span>
                </div>
                <span class="help-count-badge">{{ getVersionTag('violin') }}</span>
              </div>
              <h6 class="text-warning mb-2" style="font-size: 13.5px;">{{ $t("community_versions.violin.subtitle") }}</h6>
              <p class="text-muted-custom mb-3" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community_versions.violin.short_desc") }}</p>

              <!-- Supported Platforms -->
              <div class="d-flex gap-2 flex-wrap mb-4" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="platform-pill"><i class="fa fa-linux"></i> Linux</span>
                <span class="platform-pill"><i class="fa fa-apple"></i> macOS</span>
                <span class="platform-pill"><i class="fa fa-windows"></i> Windows</span>
              </div>
            </div>
            <div>
              <router-link
                :to="{ name: 'community-details', params: { slug: 'violin' } }"
                class="btn-all-topics"
              >
                <span>{{ $t("community.btn_repo") }}</span>
                <i class="fa fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>

        <!-- 2. Louvor JA Piano -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="contact-card h-100 d-flex flex-column justify-content-between p-3 p-md-4">
            <div>
              <!-- Version Preview Cover (Main Image) -->
              <router-link
                :to="{ name: 'community-details', params: { slug: 'piano' } }"
                class="d-block comm-card-cover mb-3 overflow-hidden"
                style="border-radius: 12px; height: 180px;"
              >
                <img
                  :src="getVersionMainImage('piano')"
                  alt="Louvor JA Piano"
                  class="img-fluid w-100 h-100"
                  style="object-fit: cover; transition: transform 0.4s ease;"
                />
              </router-link>

              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="version-logo">
                  <div class="text-logo p-0" style="font-size: 18px;">
                    {{ $t("logo.text-normal") }}
                    <span>JA</span>
                  </div>
                  <span class="codename-badge codename-piano">Piano</span>
                </div>
                <span class="help-count-badge">{{ getVersionTag('piano') }}</span>
              </div>
              <h6 class="text-warning mb-2" style="font-size: 13.5px;">{{ $t("community_versions.piano.subtitle") }}</h6>
              <p class="text-muted-custom mb-3" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community_versions.piano.short_desc") }}</p>

              <!-- Supported Platforms -->
              <div class="d-flex gap-2 flex-wrap mb-4" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="platform-pill"><i class="fa fa-windows"></i> Windows</span>
                <span class="platform-pill"><i class="fa fa-linux"></i> Linux</span>
                <span class="platform-pill"><i class="fa fa-apple"></i> macOS</span>
              </div>
            </div>
            <div>
              <router-link
                :to="{ name: 'community-details', params: { slug: 'piano' } }"
                class="btn-all-topics"
              >
                <span>{{ $t("community.btn_repo") }}</span>
                <i class="fa fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>

        <!-- 3. Louvor JA Flute -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="contact-card h-100 d-flex flex-column justify-content-between p-3 p-md-4">
            <div>
              <!-- Version Preview Cover (Main Image) -->
              <router-link
                :to="{ name: 'community-details', params: { slug: 'flute' } }"
                class="d-block comm-card-cover mb-3 overflow-hidden"
                style="border-radius: 12px; height: 180px;"
              >
                <img
                  :src="getVersionMainImage('flute')"
                  alt="Louvor JA Flute"
                  class="img-fluid w-100 h-100"
                  style="object-fit: cover; transition: transform 0.4s ease;"
                />
              </router-link>

              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="version-logo">
                  <div class="text-logo p-0" style="font-size: 18px;">
                    {{ $t("logo.text-normal") }}
                    <span>JA</span>
                  </div>
                  <span class="codename-badge codename-flute">Flute</span>
                </div>
                <span class="help-count-badge">{{ getVersionTag('flute') }}</span>
              </div>
              <h6 class="text-warning mb-2" style="font-size: 13.5px;">{{ $t("community_versions.flute.subtitle") }}</h6>
              <p class="text-muted-custom mb-3" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community_versions.flute.short_desc") }}</p>

              <!-- Supported Platforms -->
              <div class="d-flex gap-2 flex-wrap mb-4" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="platform-pill"><i class="fa fa-linux"></i> Linux</span>
                <span class="platform-pill"><i class="fa fa-apple"></i> macOS</span>
                <span class="platform-pill"><i class="fa fa-windows"></i> Windows</span>
              </div>
            </div>
            <div>
              <router-link
                :to="{ name: 'community-details', params: { slug: 'flute' } }"
                class="btn-all-topics"
              >
                <span>{{ $t("community.btn_repo") }}</span>
                <i class="fa fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { versionMetadata } from "@/versions";

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
  name: "CommunityPage",
  data() {
    return {
      dynamicTags: {},
    };
  },
  mounted() {
    this.fetchReleasesTags();
  },
  methods: {
    async fetchReleasesTags() {
      const repo = versionMetadata.flute?.repo;
      if (!repo) return;
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.tag_name) {
            this.dynamicTags.flute = data.tag_name;
          }
        }
      } catch (err) {
        console.warn("Erro ao buscar versão da release do Flute:", err);
      }
    },
    getVersionTag(slug) {
      return (
        this.dynamicTags[slug] ||
        this.$t(`community_versions.${slug}.version`)
      );
    },
    getVersionMainImage(slug) {
      const mainImgEntry = Object.entries(versionAssetModules).find(
        ([path]) =>
          path.includes(`/${slug}/`) &&
          /\/main\.(jpe?g|png|webp|svg)$/i.test(path)
      );
      if (mainImgEntry) {
        return mainImgEntry[1];
      }
      return (
        versionMetadata[slug]?.mainImage || versionMetadata.flute.mainImage
      );
    },
  },
};
</script>
