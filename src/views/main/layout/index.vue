<template>
  <!-- Mobile: sticky top bar + drawer, natural document scroll -->
  <div v-if="isMobile" class="mobile-shell">
    <header class="mobile-topbar">
      <n-button quaternary class="topbar-menu" aria-label="Open menu" @click="drawerOpen = true">
        <template #icon>
          <n-icon :component="MenuOutline" size="22" />
        </template>
      </n-button>
      <img src="@/assets/images/gingerrush-title+logo.png" alt="Ginger Rush" class="topbar-logo" />
      <div class="topbar-lang">
        <LangSwitch :collapsed="false" />
      </div>
    </header>
    <n-drawer v-model:show="drawerOpen" placement="left" :width="264" :trap-focus="false">
      <Sider class="drawer-sider" hide-trigger />
    </n-drawer>
    <main class="mobile-content">
      <router-view />
    </main>
  </div>

  <!-- Desktop & tablet -->
  <n-layout v-else has-sider position="absolute">
    <Sider />
    <n-layout-content :native-scrollbar="false" class="content">
      <div class="content-wrapper">
        <div class="content-inner">
          <router-view />
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { MenuOutline } from "@vicons/ionicons5";
import Sider from "./sider.vue";
import LangSwitch from "@/components/LangSwitch.vue";

const mobileQuery = window.matchMedia("(max-width: 767px)");
const isMobile = ref(mobileQuery.matches);
mobileQuery.addEventListener("change", e => {
  isMobile.value = e.matches;
});

const drawerOpen = ref(false);
const route = useRoute();
watch(() => route.fullPath, () => {
  drawerOpen.value = false;
});
</script>

<style scoped>
.mobile-shell {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.mobile-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: var(--n-color, #fff);
  border-bottom: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}

.topbar-menu {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.topbar-logo {
  height: 28px;
  width: auto;
  min-width: 0;
  flex: 1;
  object-fit: contain;
  object-position: left;
}

.topbar-lang {
  flex-shrink: 0;
}

.topbar-lang :deep(.lang-switch) {
  padding: 0;
  border-top: none;
}

.mobile-content {
  flex: 1;
  padding: 16px;
  --section-gap: 16px;
  min-width: 0;
}

.drawer-sider {
  height: 100%;
}

.content {
  background: var(--n-color-muted, #f5f5f5);
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.content-inner {
  flex: 1;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 32px;
  --section-gap: 32px;
  min-width: 0;
}

@media (max-width: 1023px) {
  .content-inner {
    padding: 24px;
    --section-gap: 24px;
  }
}
</style>
