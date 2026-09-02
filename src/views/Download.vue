<template>
  <section class="download-page spad set-bg">
    <div class="container text-white">
      <div class="row align-items-end">
        <!-- Left Column: Info -->
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="section-title text-left">
            <h2>{{ $t("download.title") }}</h2>
          </div>
          <h4 class="mb-4 text-warning">{{ $t("download.subtitle") }}</h4>
          <p class="mb-5 lead">{{ $t("download.description") }}</p>

          <div class="sys-req">
            <h5>
              <i class="fa fa-info-circle text-warning mr-2"></i>
              {{ $t("download.requirements_title") }}
            </h5>
            <ul class="list-unstyled mt-4">
              <li
                v-for="(req, index) in $tm('download.requirements')"
                :key="index"
                class="mb-3 req-item"
              >
                <i class="fa fa-check text-success mr-3"></i> <span v-html="req"></span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column: Download Cards -->
        <div class="col-lg-6 pl-lg-5">
          <div class="download-cards">
            <!-- Windows PT -->
            <a
              href="https://api.louvorja.com.br/pt/download"
              target="_blank"
              class="dl-card"
            >
              <div class="dl-icon">
                <i class="fa fa-windows"></i>
              </div>
              <div class="dl-info">
                <h4>{{ $t("download.button.pt") }}</h4>
                <p>{{ $t("download.button.pt_desc") }}</p>
              </div>
              <div class="dl-action">
                <i class="fa fa-download"></i>
              </div>
            </a>

            <!-- Windows ES -->
            <a
              href="https://api.louvorja.com.br/es/download"
              target="_blank"
              class="dl-card"
            >
              <div class="dl-icon">
                <i class="fa fa-windows"></i>
              </div>
              <div class="dl-info">
                <h4>{{ $t("download.button.es") }}</h4>
                <p>{{ $t("download.button.es_desc") }}</p>
              </div>
              <div class="dl-action">
                <i class="fa fa-download"></i>
              </div>
            </a>

            <!-- Web App -->
            <a
              href="https://app.louvorja.com.br/"
              target="_blank"
              class="dl-card dl-web"
            >
              <div class="dl-icon">
                <i class="fa fa-globe"></i>
              </div>
              <div class="dl-info">
                <h4>{{ $t("download.button.app") }}</h4>
                <p>{{ $t("download.button.app_desc") }}</p>
              </div>
              <div class="dl-action">
                <i class="fa fa-external-link"></i>
              </div>
            </a>

            <!-- Other Options / Community Multiplatform -->
            <router-link
              :to="{ name: 'community' }"
              class="dl-card dl-community"
            >
              <div class="dl-icon">
                <i class="fa fa-cubes"></i>
              </div>
              <div class="dl-info">
                <h4>{{ $t("download.button.community") }}</h4>
                <p>{{ $t("download.button.community_desc") }}</p>
              </div>
              <div class="dl-action">
                <i class="fa fa-arrow-right"></i>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DownloadPage",
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
};
</script>
