<template>
  <section class="donation-section spad set-bg">
    <div class="container text-white">
      <!-- Section Header -->
      <div class="row mb-5">
        <div class="col-lg-8">
          <div class="section-title text-left mb-3">
            <h2>{{ $t("donation.title") }}</h2>
          </div>
          <h4 class="mb-3 text-warning">{{ $t("donation.subtitle") }}</h4>
          <p class="lead text-muted-custom">{{ $t("donation.description") }}</p>
        </div>
      </div>

      <!-- Donation Cards Grid -->
      <div class="row">
        <!-- PIX Card -->
        <div class="col-lg-6 mb-4 d-flex">
          <div class="donation-card donation-card-pix">
            <div class="donation-card-header">
              <div class="donation-logo-badge">
                <img src="@/assets/imgs/pix.webp" alt="PIX" class="donation-img" />
              </div>
              <span class="donation-country-badge pix-badge">
                <i class="fa fa-bolt"></i> Instantâneo (Brasil)
              </span>
            </div>

            <div class="donation-card-body">
              <h4>{{ $t("donation.pix_title") }}</h4>
              <p class="donation-sub">{{ $t("donation.pix_subtitle") }}</p>
              <p class="donation-desc">{{ $t("donation.pix_desc") }}</p>

              <!-- PIX Key Box with Copy Button -->
              <div class="pix-key-wrapper">
                <div class="pix-key-display">
                  <i class="fa fa-key text-warning"></i>
                  <code>contato@louvorja.com.br</code>
                </div>
                <button
                  type="button"
                  @click="copyPixKey"
                  class="btn-copy-pix"
                  :class="{ copied: copied }"
                >
                  <i :class="copied ? 'fa fa-check' : 'fa fa-clone'"></i>
                  <span>{{ copied ? $t("donation.pix_copied") : $t("donation.pix_copy") }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- PayPal Card -->
        <div class="col-lg-6 mb-4 d-flex">
          <div class="donation-card donation-card-paypal">
            <div class="donation-card-header">
              <div class="donation-logo-badge paypal-logo-bg">
                <img src="@/assets/imgs/paypal.webp" alt="PayPal" class="donation-img" />
              </div>
              <span class="donation-country-badge paypal-badge">
                <i class="fa fa-globe"></i> Internacional / Cartão
              </span>
            </div>

            <div class="donation-card-body">
              <h4>{{ $t("donation.paypal_title") }}</h4>
              <p class="donation-sub">{{ $t("donation.paypal_subtitle") }}</p>
              <p class="donation-desc">{{ $t("donation.paypal_desc") }}</p>

              <div class="paypal-btn-wrapper">
                <a
                  href="https://www.paypal.com/donate/?business=UA3MMHHS898G2&no_recurring=0&item_name=Software+LouvorJA&currency_code=BRL"
                  target="_blank"
                  class="btn-donate-paypal"
                >
                  <i class="fa fa-paypal mr-2"></i>
                  <span>{{ $t("donation.paypal_btn") }}</span>
                  <i class="fa fa-external-link ml-2"></i>
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
  name: "DonationPage",
  data() {
    return {
      copied: false,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
  methods: {
    async copyPixKey() {
      try {
        await navigator.clipboard.writeText("contato@louvorja.com.br");
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 3000);
      } catch (err) {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = "contato@louvorja.com.br";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 3000);
      }
    },
  },
};
</script>
