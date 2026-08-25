<template>
  <section class="not-found-section d-flex align-items-center justify-content-center text-center">
    <div class="container text-white">
      <div class="error-code">404</div>
      <div class="section-title mb-4">
        <h2>{{ $t("notfound.title") }}</h2>
        <p class="mt-3 text-muted description">
          {{ $t("notfound.desc") }}
        </p>
      </div>
      <router-link :to="{ name: 'home' }" class="site-btn btn-home">
        <i class="fa fa-home me-2"></i> {{ $t("notfound.back") }}
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "NotFoundComponent",
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
};
</script>

<style scoped>
.not-found-section {
  min-height: 75vh;
  padding: 150px 0 100px;
  background: #0B1120;
  position: relative;
  overflow: hidden;
}

.not-found-section::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.05) 0%, rgba(11, 17, 32, 0) 70%);
  z-index: 0;
  pointer-events: none;
}

.container {
  position: relative;
  z-index: 1;
}

.error-code {
  font-size: 160px;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, #FBBF24 0%, #f59e0b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  text-shadow: 0 15px 40px rgba(251, 191, 36, 0.15);
  animation: float 6s ease-in-out infinite;
}

.description {
  max-width: 500px;
  margin: 0 auto;
  font-size: 18px;
  color: #a5a5b1 !important;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

.btn-home {
  background: #FBBF24;
  color: #131B2F;
  padding: 14px 40px;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.2);
  margin-top: 20px;
}

.btn-home:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4);
  color: #131B2F;
}
</style>
