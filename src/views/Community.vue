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

      <!-- Versions Grid: 6 Instrument Codenames -->
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
                <span class="help-count-badge">{{ $t("community.badge_beta") }}</span>
              </div>
              <h6 class="text-warning mb-2" style="font-size: 13.5px;">{{ $t("community.violin_sub") }}</h6>
              <p class="text-muted-custom mb-3" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community.violin_desc") }}</p>

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
                <span class="help-count-badge">{{ $t("community.badge_beta") }}</span>
              </div>
              <h6 class="text-warning mb-2" style="font-size: 13.5px;">{{ $t("community.piano_sub") }}</h6>
              <p class="text-muted-custom mb-3" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community.piano_desc") }}</p>

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
                <span class="help-count-badge">{{ $t("community.badge_alpha") }}</span>
              </div>
              <h6 class="text-warning mb-2" style="font-size: 13.5px;">{{ $t("community.flute_sub") }}</h6>
              <p class="text-muted-custom mb-3" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community.flute_desc") }}</p>

              <!-- Supported Platforms -->
              <div class="d-flex gap-2 flex-wrap mb-4" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="platform-pill"><i class="fa fa-linux"></i> Linux</span>
                <span class="platform-pill"><i class="fa fa-windows"></i> Windows</span>
                <span class="platform-pill"><i class="fa fa-apple"></i> macOS</span>
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

        <!-- 4. Louvor JA Sax -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="contact-card h-100 d-flex flex-column justify-content-between p-4">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="version-logo">
                  <div class="text-logo p-0" style="font-size: 18px;">
                    {{ $t("logo.text-normal") }}
                    <span>JA</span>
                  </div>
                  <span class="codename-badge codename-sax">Sax</span>
                </div>
                <span class="help-count-badge">{{ $t("community.badge_dev") }}</span>
              </div>
              <h6 class="text-warning mb-2" style="font-size: 13.5px;">{{ $t("community.sax_sub") }}</h6>
              <p class="text-muted-custom mb-3" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community.sax_desc") }}</p>

              <!-- Supported Platforms -->
              <div class="d-flex gap-2 flex-wrap mb-4" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="platform-pill"><i class="fa fa-windows"></i> Windows</span>
                <span class="platform-pill"><i class="fa fa-apple"></i> macOS</span>
                <span class="platform-pill"><i class="fa fa-linux"></i> Linux</span>
              </div>
            </div>
            <div>
              <router-link
                :to="{ name: 'community-details', params: { slug: 'sax' } }"
                class="btn-all-topics"
              >
                <span>{{ $t("community.btn_repo") }}</span>
                <i class="fa fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>

        <!-- 5. Louvor JA Cello -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="contact-card h-100 d-flex flex-column justify-content-between p-4">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="version-logo">
                  <div class="text-logo p-0" style="font-size: 18px;">
                    {{ $t("logo.text-normal") }}
                    <span>JA</span>
                  </div>
                  <span class="codename-badge codename-cello">Cello</span>
                </div>
                <span class="help-count-badge">{{ $t("community.badge_beta") }}</span>
              </div>
              <h6 class="text-warning mb-2" style="font-size: 13.5px;">{{ $t("community.cello_sub") }}</h6>
              <p class="text-muted-custom mb-3" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community.cello_desc") }}</p>

              <!-- Supported Platforms -->
              <div class="d-flex gap-2 flex-wrap mb-4" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="platform-pill"><i class="fa fa-windows"></i> Windows</span>
                <span class="platform-pill"><i class="fa fa-linux"></i> Linux</span>
                <span class="platform-pill"><i class="fa fa-apple"></i> macOS</span>
              </div>
            </div>
            <div>
              <router-link
                :to="{ name: 'community-details', params: { slug: 'cello' } }"
                class="btn-all-topics"
              >
                <span>{{ $t("community.btn_repo") }}</span>
                <i class="fa fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>

        <!-- 6. Louvor JA Harp -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="contact-card h-100 d-flex flex-column justify-content-between p-4">
            <div>
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="version-logo">
                  <div class="text-logo p-0" style="font-size: 18px;">
                    {{ $t("logo.text-normal") }}
                    <span>JA</span>
                  </div>
                  <span class="codename-badge codename-harp">Harp</span>
                </div>
                <span class="help-count-badge">{{ $t("community.badge_alpha") }}</span>
              </div>
              <h6 class="text-warning mb-2" style="font-size: 13.5px;">{{ $t("community.harp_sub") }}</h6>
              <p class="text-muted-custom mb-3" style="font-size: 13.5px; line-height: 1.55;">{{ $t("community.harp_desc") }}</p>

              <!-- Supported Platforms -->
              <div class="d-flex gap-2 flex-wrap mb-4" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="platform-pill"><i class="fa fa-windows"></i> Windows</span>
                <span class="platform-pill"><i class="fa fa-apple"></i> macOS</span>
                <span class="platform-pill"><i class="fa fa-linux"></i> Linux</span>
              </div>
            </div>
            <div>
              <router-link
                :to="{ name: 'community-details', params: { slug: 'harp' } }"
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
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
};
</script>
