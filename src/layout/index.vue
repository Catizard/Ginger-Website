<template>
  <n-layout has-sider position="absolute">
    <Sider />
    <n-layout-content :native-scrollbar="false" class="content">
      <div class="content-wrapper">
        <div class="search-bar">
          <n-input v-if="showSearch" v-model:value="searchQuery" :placeholder="t('search')" clearable
            class="search-input" @update:value="onSearch">
            <template #prefix>
              <n-icon>
                <SearchOutline />
              </n-icon>
            </template>
          </n-input>
        </div>
        <div class="content-inner">
          <router-view />
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { NIcon } from 'naive-ui';
import { useI18n } from '@/i18n';
import Sider from "./sider.vue";

const route = useRoute();
const { t } = useI18n();

// NOTE: I geniunely think this should be a shared component
// placed at the page of the download parents rather than this
const searchQuery = ref('');
const showSearch = computed(() => {
  return route.path.startsWith('/download');
});

function onSearch(value: string) {
  window.dispatchEvent(new CustomEvent('search-update', { detail: value }));
}

watch(route, () => {
  searchQuery.value = '';
});
</script>

<style scoped>
.content {
  background: var(--n-color-muted, #f5f5f5);
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.search-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  background: var(--n-color);
  border-bottom: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}

.search-input {
  border-radius: 8px;
}

.content-inner {
  flex: 1;
  padding: 24px;
}
</style>
