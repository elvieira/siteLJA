<template>
  <Carousel />

  <section class="intro-section spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="section-title">
            <h2>{{ $t("home.card1.title") }}</h2>
          </div>
        </div>
        <div class="col-lg-6">
          <p>{{ $t("home.card1.text") }}</p>
          <router-link :to="{ name: 'about' }" class="site-btn">
            {{ $t("home.card1.button") }}
          </router-link>
        </div>
      </div>
    </div>
  </section>

  <section class="how-section spad set-bg">
    <div class="container text-white">
      <div class="section-title">
        <h2>{{ $t("home.card2.title") }}</h2>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="how-item">
            <div class="hi-icon">
              <i class="fa fa-book"></i>
            </div>
            <h4>{{ $t("home.card2.col1.title") }}</h4>
            <p>{{ $t("home.card2.col1.text") }}</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="how-item">
            <div class="hi-icon">
              <i class="fa fa-list"></i>
            </div>
            <h4>{{ $t("home.card2.col2.title") }}</h4>
            <p>{{ $t("home.card2.col2.text") }}</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="how-item">
            <div class="hi-icon">
              <i class="fa fa-puzzle-piece"></i>
            </div>
            <h4>{{ $t("home.card2.col3.title") }}</h4>
            <p>{{ $t("home.card2.col3.text") }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Community Highlight Section -->
  <section class="community-highlight-section spad set-bg">
    <div class="container text-white">
      <div class="row align-items-center">
        <!-- Left: Info & Call to Action -->
        <div class="col-lg-7 mb-5 mb-lg-0 pr-lg-4">
          <div class="section-title text-left mb-3">
            <h2>{{ $t("community.title") }}</h2>
          </div>
          <h4 class="mb-3 text-warning">{{ $t("community.subtitle") }}</h4>
          <p class="lead text-muted-custom mb-4">{{ $t("community.description") }}</p>
        </div>

        <!-- Right: Modern Showcase Card -->
        <div class="col-lg-5">
          <div class="faq-sidebar-cta p-4 text-center">
            <div class="d-flex justify-content-center align-items-center gap-3 mb-3" style="display: flex; gap: 20px; justify-content: center; font-size: 32px; color: #FBBF24;">
              <i class="fa fa-linux"></i>
              <i class="fa fa-apple"></i>
              <i class="fa fa-windows"></i>
            </div>
            <div class="version-logo justify-content-center mb-2" style="justify-content: center;">
              <div class="text-logo p-0" style="font-size: 20px;">
                {{ $t("logo.text-normal") }}
                <span>JA</span>
              </div>
            </div>
            <h6 class="text-warning mb-3 font-weight-bold">Linux • macOS • Windows</h6>
            <router-link :to="{ name: 'community' }" class="btn-all-topics">
              <span>{{ $t("carousel.slide3.button1") }}</span>
              <i class="fa fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="concept-section spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="section-title">
            <h2>{{ $t("home.card3.title") }}</h2>
          </div>
        </div>
        <div class="col-lg-6" style="white-space: pre-line">
          {{ $t("home.card3.text") }}
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-sm-6">
          <div class="concept-item">
            <img src="@/assets/imgs/photo-002.jpg" alt="" />
            <h5>{{ $t("home.card3.photo1") }}</h5>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="concept-item">
            <img src="@/assets/imgs/photo-004.jpg" alt="" />
            <h5>{{ $t("home.card3.photo2") }}</h5>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="concept-item">
            <img src="@/assets/imgs/photo-003.jpg" alt="" />
            <h5>{{ $t("home.card3.photo3") }}</h5>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6">
          <div class="concept-item">
            <img src="@/assets/imgs/photo-001.jpg" alt="" />
            <h5>{{ $t("home.card3.photo4") }}</h5>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Carousel from "@/components/Carousel.vue";

export default {
  name: "HomePage",
  components: {
    Carousel,
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
};
</script>
