<template>
  <section class="help-section spad set-bg">
    <div class="container text-white">
      <!-- Header -->
      <div class="row mb-5">
        <div class="col-lg-8">
          <div class="section-title text-left mb-3">
            <h2>{{ $t("help.title") }}</h2>
          </div>
          <h4 class="mb-3 text-warning">{{ $t("help.subtitle") }}</h4>
          <p class="lead text-muted-custom">{{ $t("help.description") }}</p>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="row">
        <div
          v-for="(category, key) in help"
          :key="key"
          class="col-lg-4 col-md-6 mb-4 d-flex"
        >
          <div class="help-card">
            <div class="help-card-header">
              <div class="help-card-icon">
                <i :class="category.icon"></i>
              </div>
              <div class="help-card-title-wrap">
                <h4>{{ category.title }}</h4>
                <span class="help-count-badge">
                  {{ Object.keys(category.items).length }} {{ $t("help.articles_count") }}
                </span>
              </div>
            </div>

            <ul class="help-links-list">
              <li v-for="(item, url) in category.items" :key="url">
                <router-link
                  :to="{ name: 'help-item', params: { slug: url } }"
                  class="help-link-item"
                >
                  <i class="fa fa-angle-right"></i>
                  <span>{{ item.title }}</span>
                </router-link>
              </li>
            </ul>
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
  name: "HelpPage",
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
