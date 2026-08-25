<template>
  <div v-if="showModal" class="popup-overlay" @click.self="closeModal">
    <div class="popup-box">
      <button class="close-btn" @click="closeModal">×</button>

      <div class="popup-header">
        <h3>📸 Já conhece nosso Instagram?</h3>
      </div>

      <div class="popup-content">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          class="insta-logo"
        />

        <h3>@louvorja.app</h3>

        <p>Siga nossa página, curta e compartilhe.</p>

        <router-link
          :to="{ name: 'instagram' }"
          target="_blank"
          class="follow-btn"
        >
          Seguir no Instagram
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupLayout",

  data() {
    return {
      showModal: false,
      storageKey: "instagramPopupLastShown",
      showAgainAfterDays: 14,
    };
  },

  mounted() {
    this.checkPopupDisplay();
  },

  methods: {
    checkPopupDisplay() {
      const lastShown = localStorage.getItem(this.storageKey);
      const now = Date.now();

      const interval = this.showAgainAfterDays * 24 * 60 * 60 * 1000;

      if (!lastShown || now - parseInt(lastShown) > interval) {
        this.showModal = true;
      }
    },

    closeModal() {
      localStorage.setItem(this.storageKey, Date.now());

      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  backdrop-filter: blur(5px);
}

.popup-box {
  width: 420px;
  max-width: 92%;
  background: #131B2F;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  position: relative;
  animation: pop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  top: 14px;
  right: 18px;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 22px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #a5a5b1;
  transition: all 0.2s ease;
  z-index: 2;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.popup-header {
  padding: 30px 20px 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.popup-header h3 {
  color: white;
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.popup-content {
  padding: 30px;
  text-align: center;
}

.insta-logo {
  width: 70px;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 10px rgba(225, 48, 108, 0.3));
}

.popup-content h3 {
  color: #FBBF24;
  font-size: 20px;
  margin-bottom: 10px;
}

.popup-content p {
  color: #a5a5b1;
  margin-bottom: 25px;
  font-size: 15px;
}

.follow-btn {
  display: inline-block;
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
  text-decoration: none;
  padding: 14px 35px;
  border-radius: 999px;
  font-weight: bold;
  font-size: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 15px rgba(220, 39, 67, 0.4);
}

.follow-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 39, 67, 0.6);
  color: white;
}
</style>
