<template>
  <!-- Hero section -->
  <section class="hero-section">
    <div class="hero-slider">
      <Carousel v-bind="carouselConfig">
        <Slide v-for="slide in 3" :key="slide">
          <div class="hs-item">
            <div class="container">
              <div v-if="slide == 1" class="row align-items-center">
                <div class="col-lg-6">
                  <div class="hs-text">
                    <h2>
                      <span>{{ $t("carousel.slide1.title[0]") }}</span>
                      {{ $t("carousel.slide1.title[1]") }}
                    </h2>
                    <p>{{ $t("carousel.slide1.text") }}</p>
                    <router-link :to="{ name: 'download' }" class="site-btn">
                      {{ $t("carousel.slide1.button1") }}
                    </router-link>
                    <a
                      href="https://app.louvorja.com.br/"
                      target="_blank"
                      class="site-btn sb-c2"
                    >
                      {{ $t("carousel.slide1.button2") }}
                    </a>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="hr-img">
                    <img
                      v-if="lang === 'pt'"
                      src="@/assets/imgs/001-pt.png"
                      alt=""
                    />
                    <img
                      v-else-if="lang === 'es'"
                      src="@/assets/imgs/001-es.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div v-else-if="slide == 2" class="row align-items-center">
                <div class="col-lg-6">
                  <div class="hs-text">
                    <h2>
                      <span>{{ $t("carousel.slide2.title[0]") }}</span>
                      {{ $t("carousel.slide2.title[1]") }}
                    </h2>
                    <p>{{ $t("carousel.slide2.text") }}</p>
                    <a
                      href="https://app.louvorja.com.br/"
                      target="_blank"
                      class="site-btn"
                    >
                      {{ $t("carousel.slide2.button1") }}
                    </a>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="hr-img">
                    <img
                      v-if="lang === 'pt'"
                      src="@/assets/imgs/002-pt.png"
                      alt=""
                    />
                    <img
                      v-else-if="lang === 'es'"
                      src="@/assets/imgs/002-es.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div v-else class="row align-items-center">
                <div class="col-lg-12">
                  <div class="hs-text">
                    <h2>
                      {{ $t("carousel.slide3.title[0]") }}
                      <span>{{ $t("carousel.slide3.title[1]") }}</span>
                    </h2>
                    <p>{{ $t("carousel.slide3.text") }}</p>
                    <router-link :to="{ name: 'donation' }" class="site-btn">
                      {{ $t("carousel.slide3.button1") }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </section>
  <!-- Hero section end -->
</template>

<script>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  name: "CarouselComponent",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data: () => ({
    carouselConfig: {
      itemsToShow: 1,
      wrapAround: true,
    },
  }),
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
};
</script>

<style>
.carousel__icon {
  fill: white;
}
.carousel__pagination button {
  opacity: 0.3;
  background: white;
}
.carousel__pagination .carousel__pagination-button--active {
  opacity: 1;
}
</style>
