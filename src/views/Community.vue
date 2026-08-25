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

      <!-- Loading State -->
      <div v-if="loading" class="row mb-5">
        <div class="col-12 text-center py-5">
          <i class="fa fa-circle-o-notch fa-spin text-warning mb-3" style="font-size: 36px;"></i>
          <p class="text-muted-custom">Buscando e validando versões nos repositórios...</p>
        </div>
      </div>

      <!-- Versions Grid: Dynamic Validated Versions from GitHub / Registry -->
      <div v-else-if="versionsList.length > 0" class="row mb-5">
        <div
          v-for="v in versionsList"
          :key="v.slug"
          class="col-lg-4 col-md-6 mb-4"
        >
          <div class="contact-card h-100 d-flex flex-column justify-content-between p-3 p-md-4">
            <div>
              <!-- Version Preview Cover (Main Image from GitHub / Local) -->
              <router-link
                :to="{ name: 'community-details', params: { slug: v.slug } }"
                class="d-block comm-card-cover mb-3 overflow-hidden"
                style="border-radius: 12px; height: 180px;"
              >
                <img
                  :src="v.mainImage"
                  :alt="'Louvor JA ' + v.codename"
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
                  <span
                    class="codename-badge"
                    :style="{
                      color: v.color,
                      backgroundColor: hexToRgba(v.color, 0.15),
                      borderColor: hexToRgba(v.color, 0.35)
                    }"
                  >
                    {{ v.codename }}
                  </span>
                </div>
                <span class="help-count-badge">{{ v.versionTag }}</span>
              </div>

              <!-- Subtitle & Short Desc -->
              <h6 class="text-warning mb-2" style="font-size: 13.5px;">
                {{ getVersionText(v, 'subtitle') }}
              </h6>
              <p class="text-muted-custom mb-3" style="font-size: 13.5px; line-height: 1.55;">
                {{ getVersionText(v, 'short_desc') }}
              </p>

              <!-- Supported Platforms -->
              <div class="d-flex gap-2 flex-wrap mb-4" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span v-if="v.platforms.includes('linux')" class="platform-pill">
                  <i class="fa fa-linux"></i> Linux
                </span>
                <span v-if="v.platforms.includes('mac')" class="platform-pill">
                  <i class="fa fa-apple"></i> macOS
                </span>
                <span v-if="v.platforms.includes('windows')" class="platform-pill">
                  <i class="fa fa-windows"></i> Windows
                </span>
              </div>
            </div>

            <div>
              <router-link
                :to="{ name: 'community-details', params: { slug: v.slug } }"
                class="btn-all-topics"
              >
                <span>{{ $t("community.btn_repo") }}</span>
                <i class="fa fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty / Error state -->
      <div v-else class="row mb-5">
        <div class="col-12 text-center py-5">
          <p class="text-muted-custom">Nenhuma versão encontrada ou repositórios temporariamente inacessíveis.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { loadAllCommunityVersions, injectRemoteTranslations, hexToRgba } from "@/versions";

export default {
  name: "CommunityPage",
  data() {
    return {
      versionsList: [],
      loading: true,
    };
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale || "pt";
    },
  },
  async mounted() {
    await this.fetchCommunityVersions();
  },
  methods: {
    hexToRgba,
    async fetchCommunityVersions() {
      this.loading = true;
      try {
        const validated = await loadAllCommunityVersions();
        this.versionsList = validated;
        injectRemoteTranslations(this.$i18n, validated);
      } catch (err) {
        console.error("Erro ao carregar versões da comunidade:", err);
      } finally {
        this.loading = false;
      }
    },
    getVersionText(versionData, field) {
      const loc = this.currentLocale;
      const trans = versionData?.translations;
      if (!trans) return "";
      return trans[loc]?.[field] || trans.pt?.[field] || trans.es?.[field] || "";
    },
  },
};
</script>
