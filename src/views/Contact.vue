<template>
  <section class="contact-section spad set-bg">
    <div class="container text-white">
      <!-- Section Header -->
      <div class="row mb-5">
        <div class="col-lg-8">
          <div class="section-title text-left mb-3">
            <h2>{{ $t("contact.title") }}</h2>
          </div>
          <h4 class="mb-3 text-warning">{{ $t("contact.subtitle") }}</h4>
          <p class="lead text-muted-custom">{{ $t("contact.description") }}</p>
        </div>
      </div>

      <!-- Contact Cards Grid -->
      <div class="row">
        <!-- WhatsApp Card -->
        <div class="col-lg-6 mb-4 d-flex">
          <div class="contact-card contact-card-whatsapp">
            <div class="contact-card-icon">
              <i class="fa fa-whatsapp"></i>
            </div>
            <div class="contact-card-content">
              <h4>{{ $t("contact.whatsapp_title") }}</h4>
              <p>{{ $t("contact.whatsapp_desc") }}</p>
              <div>
                <a
                  :href="$router.resolve({ name: 'whatsapp' }).href"
                  target="_blank"
                  class="contact-btn contact-btn-whatsapp"
                >
                  {{ $t("contact.btn_whatsapp") }} <i class="fa fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Email Card -->
        <div class="col-lg-6 mb-4 d-flex">
          <div class="contact-card contact-card-email">
            <div class="contact-card-icon">
              <i class="fa fa-envelope"></i>
            </div>
            <div class="contact-card-content">
              <h4>{{ $t("contact.email_title") }}</h4>
              <p>{{ $t("contact.email_desc") }}</p>
              <div>
                <a href="mailto:contato@louvorja.com.br" class="contact-btn contact-btn-email">
                  <i class="fa fa-paper-plane"></i> contato@louvorja.com.br
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Telegram Card -->
        <div class="col-lg-6 mb-4 d-flex">
          <div class="contact-card contact-card-telegram">
            <div class="contact-card-icon">
              <i class="fa fa-telegram"></i>
            </div>
            <div class="contact-card-content">
              <h4>{{ $t("contact.telegram_title") }}</h4>
              <p>{{ $t("contact.telegram_desc") }}</p>
              <div>
                <a
                  :href="$router.resolve({ name: 'telegram' }).href"
                  target="_blank"
                  class="contact-btn contact-btn-telegram"
                >
                  {{ $t("contact.btn_telegram") }} <i class="fa fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Dev Community Card -->
        <div class="col-lg-6 mb-4 d-flex">
          <div class="contact-card contact-card-dev">
            <div class="contact-card-icon">
              <i class="fa fa-code"></i>
            </div>
            <div class="contact-card-content">
              <h4>{{ $t("contact.dev_title") }}</h4>
              <p>{{ $t("contact.dev_desc") }}</p>
              <div>
                <a
                  :href="$router.resolve({ name: 'telegram-dev' }).href"
                  target="_blank"
                  class="contact-btn contact-btn-dev"
                >
                  {{ $t("contact.btn_dev") }} <i class="fa fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContactPage",
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
};
</script>
