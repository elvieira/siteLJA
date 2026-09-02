<template>
  <!-- Hero section -->
  <section class="hero-section">
    <div class="hero-slider">
      <Carousel v-bind="carouselConfig">
        <Slide v-for="slide in 4" :key="slide">
          <div class="hs-item">
            <div class="container">
              <!-- Slide 1: Windows Desktop -->
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
                      src="@/assets/imgs/001-pt.webp"
                      alt=""
                    />
                    <img
                      v-else-if="lang === 'es'"
                      src="@/assets/imgs/001-es.webp"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <!-- Slide 2: Web App -->
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
                      src="@/assets/imgs/002-pt.webp"
                      alt=""
                    />
                    <img
                      v-else-if="lang === 'es'"
                      src="@/assets/imgs/002-es.webp"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <!-- Slide 3: Multiplataforma / Comunidade -->
              <div v-else-if="slide == 3" class="row align-items-center">
                <div class="col-lg-6">
                  <div class="hs-text">
                    <h2>
                      <span>{{ $t("carousel.slide3.title[0]") }}</span>
                      {{ $t("carousel.slide3.title[1]") }}
                    </h2>
                    <p>{{ $t("carousel.slide3.text") }}</p>
                    <router-link :to="{ name: 'community' }" class="site-btn">
                      {{ $t("carousel.slide3.button1") }}
                    </router-link>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="hr-img">
                    <img
                      src="@/assets/imgs/photo-community.webp"
                      alt="Louvor JA Multiplataforma"
                      class="img-fluid rounded-4 shadow-lg"
                      style="border-radius: 20px; max-height: 420px; object-fit: cover;"
                    />
                  </div>
                </div>
              </div>

              <!-- Slide 4: Doação -->
              <div v-else class="row align-items-center">
                <div class="col-lg-12">
                  <div class="hs-text">
                    <h2>
                      {{ $t("carousel.slide4.title[0]") }}
                      <span>{{ $t("carousel.slide4.title[1]") }}</span>
                    </h2>
                    <p>{{ $t("carousel.slide4.text") }}</p>
                    <router-link :to="{ name: 'donation' }" class="site-btn">
                      {{ $t("carousel.slide4.button1") }}
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
      autoplay: 6000,
      pauseAutoplayOnHover: true,
      transition: 600,
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
/* Customização das setas de navegação no desktop */
.hero-slider .carousel__prev,
.hero-slider .carousel__next {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  z-index: 10;
  margin: 0 16px;
}

.hero-slider .carousel__prev:hover,
.hero-slider .carousel__next:hover {
  background: #FBBF24;
  border-color: #FBBF24;
  color: #0f172a;
}

.hero-slider .carousel__prev:hover .carousel__icon,
.hero-slider .carousel__next:hover .carousel__icon {
  fill: #0f172a;
}

.carousel__icon {
  fill: currentColor;
  width: 20px;
  height: 20px;
  transition: fill 0.2s ease;
}

/* Paginação com dots/pills elegantes */
.hero-slider .carousel__pagination {
  margin-top: -30px;
  padding-bottom: 25px;
  z-index: 10;
  position: relative;
}

.hero-slider .carousel__pagination button {
  width: 24px;
  height: 4px;
  border-radius: 4px;
  opacity: 0.25;
  background: #ffffff;
  margin: 0 4px;
  padding: 0;
  transition: all 0.3s ease;
}

.hero-slider .carousel__pagination .carousel__pagination-button--active {
  opacity: 1;
  background: #FBBF24;
  width: 36px;
}

.carousel__slide {
  overflow: hidden;
  width: 100%;
}

.hero-slider .hs-text h2 {
  overflow-wrap: break-word;
  word-break: normal;
  hyphens: manual;
}

/* Solução para telas menores e dispositivos móveis (evita sobrepor o texto e vazamento) */
@media (max-width: 991px) {
  /* Em telas menores que 992px, onde o texto ocupa a largura inteira,
     ocultamos as setas para não ficarem em cima da leitura.
     O usuário navega naturalmente pelo swipe de toque ou pelos botões da paginação. */
  .hero-slider .carousel__prev,
  .hero-slider .carousel__next {
    display: none !important;
  }

  .hero-slider .hs-item {
    min-height: 580px;
    padding-top: 80px;
    padding-bottom: 30px;
  }

  .hero-slider .hs-text h2 {
    font-size: 36px;
    line-height: 1.1;
    margin-bottom: 16px;
  }

  .hero-slider .carousel__pagination {
    margin-top: 10px;
    padding-bottom: 30px;
  }
}

@media (max-width: 480px) {
  .hero-slider .hs-text h2 {
    font-size: 28px;
    line-height: 1.15;
  }
}
</style>
