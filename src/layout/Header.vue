<template>
  <header class="header-section">
    <router-link to="/" class="site-logo">
      <div class="d-flex align-items-center">
        <img src="@/assets/imgs/logo.svg" alt="" />
        <div class="text-logo">
          {{ $t("logo.text-normal") }}
          <span>JA</span>
        </div>
      </div>
    </router-link>
    <button class="mobile-menu-btn" @click="isMobileMenuOpen = !isMobileMenuOpen" :class="{ open: isMobileMenuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="main-menu" :class="{ 'mobile-open': isMobileMenuOpen }">
      <li>
        <router-link :to="{ name: 'home' }" @click="isMobileMenuOpen = false">{{ $t("menu.home") }}</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'about' }" @click="isMobileMenuOpen = false">
          {{ $t("menu.about") }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'download' }" @click="isMobileMenuOpen = false">
          {{ $t("menu.download") }}
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'community' }"
          :class="{ 'router-link-active': $route.path.startsWith('/comunidade') }"
          @click="isMobileMenuOpen = false"
        >
          {{ $t("menu.community") }}
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'help' }"
          :class="{ 'router-link-active': $route.path.startsWith('/ajuda') || $route.name === 'faq' }"
          @click="isMobileMenuOpen = false"
        >
          {{ $t("menu.help") }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'contact' }" @click="isMobileMenuOpen = false">
          {{ $t("menu.contact") }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'donation' }" @click="isMobileMenuOpen = false">
          {{ $t("menu.donation") }}
        </router-link>
      </li>
      <li class="lang-switch">
        <div class="lang-toggle">
          <span @click="changeLocale('pt')" :class="{ active: $i18n.locale === 'pt' }">PT</span>
          <span @click="changeLocale('es')" :class="{ active: $i18n.locale === 'es' }">ES</span>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "HeaderLayout",
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  computed: {
    flag() {
      const flags = {
        pt: "br",
        es: "es",
      };
      return flags[this.$i18n.locale] || "br";
    },
  },
  methods: {
    changeLocale(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
      this.isMobileMenuOpen = false;
    },
  },
};
</script>
