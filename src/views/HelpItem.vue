<template>
  <section v-if="helpItem" class="help-item-section spad set-bg">
    <div class="container text-white">
      <!-- Back Navigation & Title -->
      <div class="help-item-header mb-4">
        <router-link :to="{ name: 'help' }" class="help-back-link mb-3">
          <i class="fa fa-arrow-left"></i>
          <span>{{ $t("help.link_back") }}</span>
        </router-link>
        <div class="section-title text-left mb-0">
          <h2>{{ helpItem.title }}</h2>
        </div>
      </div>

      <div class="row">
        <!-- Main Content -->
        <div class="col-lg-8 mb-5">
          <div class="help-article-card">
            <template v-for="(item, key) in helpItem.text" :key="key">
              <!-- Section Title -->
              <h4 v-if="item.type == 'title'" class="help-article-subtitle">
                {{ item.value }}
              </h4>

              <!-- List -->
              <ul v-else-if="item.type == 'list'" class="help-article-list">
                <li
                  v-for="(item_list, k_item) in item.value"
                  :key="k_item"
                  v-html="item_list"
                />
              </ul>

              <!-- Code Block -->
              <div v-else-if="item.type == 'code'" class="help-code-block">
                <code v-html="item.value" />
              </div>

              <!-- Custom Dynamic Component -->
              <component
                v-else-if="item.type == 'component'"
                :is="resolveComponent(item.value)"
                class="help-custom-component my-4"
              />

              <!-- Standard Paragraph -->
              <p v-else class="help-article-p">
                <span v-html="item.value" />
                <router-link
                  v-if="item.link"
                  class="help-inline-link ml-2"
                  :to="{ name: 'help-item', params: { slug: item.link } }"
                >
                  <i class="fa fa-external-link"></i>
                  <span>{{ $t("help.link_more") }}</span>
                </router-link>
              </p>
            </template>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4 mb-5">
          <div class="help-sidebar-card">
            <div class="help-sidebar-header">
              <i class="fa fa-bookmark-o text-warning"></i>
              <h5>{{ $t("help.related") }}</h5>
            </div>
            
            <ul class="help-sidebar-list">
              <template v-for="category in categories" :key="category">
                <template
                  v-for="(item, url) in help[category].items"
                  :key="url"
                >
                  <li v-if="url != slug">
                    <router-link
                      :to="{ name: 'help-item', params: { slug: url } }"
                      class="help-sidebar-link"
                    >
                      <i class="fa fa-angle-right"></i>
                      <span>{{ item.title }}</span>
                    </router-link>
                  </li>
                </template>
              </template>
            </ul>

            <div class="help-sidebar-footer mt-4 pt-3">
              <router-link :to="{ name: 'help' }" class="btn-all-topics">
                <i class="fa fa-th-large"></i>
                <span>{{ $t("help.link_back") }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <NotFoundComponent v-else />
</template>

<script>
import { defineAsyncComponent } from "vue";
import NotFoundComponent from "@/components/NotFound.vue";

import helpPt from "../help/pt.json";
import helpEs from "../help/es.json";

export default {
  name: "HelpPage",
  components: {
    NotFoundComponent,
  },
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
    helpItem() {
      let item = null;
      Object.keys(this.help).map((c) => {
        if (this.help[c].items[this.slug]) {
          item = this.help[c].items[this.slug];
          return;
        }
      });

      return item;
    },
    categories() {
      let items = [];
      Object.keys(this.help).map((c) => {
        if (this.help[c].items[this.slug]) {
          items.push(c);
        }
      });

      return items;
    },
    slug() {
      return this.$route.params.slug;
    },
  },
  methods: {
    resolveComponent(name) {
      return defineAsyncComponent(() =>
        import(`@/components/help/${name}.vue`)
      );
    },
  },
};
</script>
