<template>
  <!-- Google font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />

  <!-- Page Preloder -->
  <div id="preloder">
    <div class="loader"></div>
  </div>

  <Header />
  <Popup />

  <router-view />

  <Footer />

  <!--====== Javascripts & Jquery ======-->
</template>

<script>
import Header from "@/layout/Header.vue";
import Footer from "@/layout/Footer.vue";
import Popup from "@/layout/Popup.vue";

export default {
  name: "AppPage",
  components: {
    Header,
    Footer,
    Popup,
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get("lang");
    if (lang) {
      this.$i18n.locale = lang;
      const url = new URL(window.location.href);
      url.searchParams.delete("lang");
      window.history.replaceState({}, "", url.toString());
      localStorage.setItem("lang", lang);
    }

    $(".loader").fadeOut();
    $("#preloder").delay(400).fadeOut("slow");

    $(".set-bg").each(function () {
      var bg = $(this).data("setbg");
      $(this).css("background-image", "url(" + bg + ")");
    });
  },
};
</script>
