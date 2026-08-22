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
          <div class="contact-card h-100 d-flex flex-column justify-content-between p-4">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="version-logo">
                  <div class="text-logo p-0" style="font-size: 18px;">
                    {{ $t("logo.text-normal") }}
                    <span>JA</span>
                  </div>
                  <span class="codename-badge codename-violin">Violin</span>
                </div>
                <span class="help-count-badge">{{ $t("community_versions.violin.version") }}</span>
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
          <div class="contact-card h-100 d-flex flex-column justify-content-between p-4">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="version-logo">
                  <div class="text-logo p-0" style="font-size: 18px;">
                    {{ $t("logo.text-normal") }}
                    <span>JA</span>
                  </div>
                  <span class="codename-badge codename-piano">Piano</span>
                </div>
                <span class="help-count-badge">{{ $t("community_versions.piano.version") }}</span>
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
          <div class="contact-card h-100 d-flex flex-column justify-content-between p-4">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="version-logo">
                  <div class="text-logo p-0" style="font-size: 18px;">
                    {{ $t("logo.text-normal") }}
                    <span>JA</span>
                  </div>
                  <span class="codename-badge codename-flute">Flute</span>
                </div>
                <span class="help-count-badge">{{ $t("community_versions.flute.version") }}</span>
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
export default {
  name: "CommunityPage",
};
</script>
