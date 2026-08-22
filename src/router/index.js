import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Download from "@/views/Download.vue";
import Contact from "@/views/Contact.vue";
import Donation from "@/views/Donation.vue";
import Community from "@/views/Community.vue";
import CommunityDetails from "@/views/CommunityDetails.vue";
import Dev from "@/views/Dev.vue";
import Help from "@/views/Help.vue";
import HelpItem from "@/views/HelpItem.vue";
import FAQ from "@/views/FAQ.vue";
import Version from "@/views/Version.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/programa",
    name: "about",
    component: About,
  },
  {
    path: "/download",
    name: "download",
    component: Download,
  },
  {
    path: "/comunidade",
    name: "community",
    component: Community,
  },
  {
    path: "/comunidade/:slug",
    name: "community-details",
    component: CommunityDetails,
    props: true,
  },
  {
    path: "/contato",
    name: "contact",
    component: Contact,
  },
  {
    path: "/doacao",
    name: "donation",
    component: Donation,
  },
  {
    path: "/ajuda",
    name: "help",
    component: Help,
  },
  {
    path: "/ajuda/:slug",
    name: "help-item",
    component: HelpItem,
    props: (route) => ({ slug: route.params.slug }),
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQ,
  },
  {
    path: "/versao",
    name: "version",
    component: Version,
  },
  {
    path: "/dev",
    name: "dev",
    component: Dev,
  },
  {
    path: "/drive",
    name: "drive",
    beforeEnter(to, from, next) {
      window.location.href = import.meta.env.VITE_DRIVE_URL;
      next(false);
    },
  },
  {
    path: "/drive_es",
    name: "es_drive",
    beforeEnter(to, from, next) {
      window.location.href = import.meta.env.VITE_ES_DRIVE_URL;
      next(false);
    },
  },
  {
    path: "/whatsapp",
    name: "whatsapp",
    beforeEnter(to, from, next) {
      window.location.href = import.meta.env.VITE_WHATSAPP_URL;
      next(false);
    },
  },
  {
    path: "/telegram",
    name: "telegram",
    beforeEnter(to, from, next) {
      window.location.href = import.meta.env.VITE_TELEGRAM_URL;
      next(false);
    },
  },
  {
    path: "/telegram-dev",
    name: "telegram-dev",
    beforeEnter(to, from, next) {
      window.location.href = import.meta.env.VITE_TELEGRAM_DEV_URL;
      next(false);
    },
  },
  {
    path: "/facebook",
    name: "facebook",
    beforeEnter(to, from, next) {
      window.location.href = import.meta.env.VITE_FACEBOOK_URL;
      next(false);
    },
  },
  {
    path: "/instagram",
    name: "instagram",
    beforeEnter(to, from, next) {
      window.location.href = import.meta.env.VITE_INSTAGRAM_URL;
      next(false);
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL ?? "/"),
  routes,
});

export default router;
