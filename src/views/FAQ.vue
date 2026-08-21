<template>
  <section class="faq-section spad set-bg">
    <div class="container text-white">
      <!-- Section Header -->
      <div class="row mb-5">
        <div class="col-lg-8">
          <div class="section-title text-left mb-3">
            <h2>{{ $t("faq.title") }}</h2>
          </div>
          <h4 class="mb-3 text-warning">{{ $t("faq.subtitle") }}</h4>
          <p class="lead text-muted-custom">{{ $t("faq.description") }}</p>
        </div>
      </div>

      <!-- Content Grid: 8 Cols FAQ List + 4 Cols Sidebar CTA -->
      <div class="row">
        <!-- FAQ Questions List (8 Columns) -->
        <div class="col-lg-8 mb-4">
          <div class="faq-list-card">
            <div class="faq-list-header">
              <div class="faq-header-left">
                <i class="fa fa-question-circle text-warning"></i>
                <h5>{{ $t("faq.title") }}</h5>
              </div>
              <span class="help-count-badge" v-if="help['faq'] && help['faq'].items">
                {{ Object.keys(help['faq'].items).length }} {{ $t("help.articles_count") }}
              </span>
            </div>

            <ul class="faq-items-list" v-if="help['faq'] && help['faq'].items">
              <li v-for="(item, url) in help['faq'].items" :key="url">
                <router-link
                  :to="{ name: 'help-item', params: { slug: url } }"
                  class="faq-item-link"
                >
                  <div class="faq-item-content">
                    <i class="fa fa-angle-right faq-item-bullet"></i>
                    <span class="faq-item-title">{{ item.title }}</span>
                  </div>
                  <i class="fa fa-arrow-right faq-item-arrow"></i>
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sidebar CTA: Central de Ajuda (4 Columns) -->
        <div class="col-lg-4 mb-4">
          <div class="faq-sidebar-cta">
            <div class="faq-cta-header">
              <div class="faq-cta-icon">
                <i class="fa fa-life-ring"></i>
              </div>
              <h5>{{ $t("faq.help_cta_title") }}</h5>
            </div>
            <p class="faq-cta-text">{{ $t("faq.help_cta_desc") }}</p>
            <router-link :to="{ name: 'help' }" class="btn-faq-help-full">
              <i class="fa fa-book"></i>
              <span>{{ $t("faq.help_cta_btn") }}</span>
              <i class="fa fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import helpPt from "../help/pt.json";
import helpEs from "../help/es.json";

export default {
  name: "FAQPage",
  computed: {
    lang() {
      return this.$i18n.locale;
    },
    help() {
      let help = this.lang === "pt" ? helpPt : helpEs;
      let helpUnified = {};
      Object.keys(help.categories).map((c) => {
        if (Array.isArray(help.categories[c].items)) {
          let items = help.categories[c].items;
          help.categories[c].items = {};
          items.map((i) => {
            help.categories[c].items[i] = help.items[i];
          });
        }
      });

      return help.categories;
    },
  },
};
</script>
