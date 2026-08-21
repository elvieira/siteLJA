<template>
  <div>
    <ul class="nav nav-tabs mb-3">
      <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
        <a
          class="nav-link"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
          style="cursor: pointer"
        >
          {{ tab.name }}
        </a>
      </li>
    </ul>
    <Hymnal1996x2022 v-if="activeTab === 'hymnal1996x2022'" />
    <Hymnal2022x1996 v-if="activeTab === 'hymnal2022x1996'" />
    <HymnalRemoved v-if="activeTab === 'hymnalRemoved'" />
    <HymnalNew v-if="activeTab === 'hymnalNew'" />
  </div>
</template>

<script>
import Hymnal1996x2022 from "@/components/help/partials/Hymnal1996x2022.vue";
import Hymnal2022x1996 from "@/components/help/partials/Hymnal2022x1996.vue";
import HymnalRemoved from "@/components/help/partials/HymnalRemoved.vue";
import HymnalNew from "@/components/help/partials/HymnalNew.vue";

export default {
  name: "HymnalRelationComponent",
  components: {
    Hymnal1996x2022,
    Hymnal2022x1996,
    HymnalRemoved,
    HymnalNew,
  },
  data() {
    return {
      tabs: [
        { id: "hymnal1996x2022", name: "Hinário 1996 x 2022" },
        { id: "hymnal2022x1996", name: "Hinário 2022 x 1996" },
        { id: "hymnalRemoved", name: "Hinos Removidos" },
        { id: "hymnalNew", name: "Hinos Novos" },
      ],
      activeTab: "hymnal1996x2022",
    };
  },
};
</script>

<style scoped>
.nav-tabs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 12px;
}
.nav-link {
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-weight: 600;
  font-size: 13.5px;
  color: #94a3b8;
  padding: 8px 18px;
  transition: all 0.25s ease;
  background: rgba(255, 255, 255, 0.04);
}
.nav-link:hover {
  background: rgba(251, 191, 36, 0.1);
  color: #FBBF24;
  border-color: rgba(251, 191, 36, 0.3);
}
.nav-link.active {
  background: #FBBF24;
  color: #0F172A;
  border-color: #FBBF24;
  font-weight: 700;
}
</style>
