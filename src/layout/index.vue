<template>
  <n-layout has-sider position="absolute">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :native-scrollbar="false"
      class="sider"
    >
      <div class="logo" @click="goHome">
        <img src="/gingerrush-title+logo.png" alt="Ginger Rush" class="logo-img" />
      </div>
      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="currentKey"
        @update:value="handleMenuSelect"
        class="menu"
      />
      <div class="lang-switch">
        <n-select v-model:value="lang" :options="langOptions" size="small" />
      </div>
    </n-layout-sider>
    <n-layout-content :native-scrollbar="false" class="content">
      <div class="content-wrapper">
        <div class="search-bar">
          <n-input
            v-if="showSearch"
            v-model:value="searchQuery"
            :placeholder="t('search')"
            clearable
            class="search-input"
            @update:value="onSearch"
          >
            <template #prefix>
              <n-icon><SearchOutline /></n-icon>
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
import { h, computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NIcon, NMenu, NSelect } from 'naive-ui';
import {
  InformationCircleOutline,
  DownloadOutline,
  ListOutline,
  CalendarOutline,
  FolderOutline,
  SearchOutline
} from '@vicons/ionicons5';
import { useI18n, type Lang } from '@/i18n';

const router = useRouter();
const route = useRoute();
const { t, currentLang, setLang } = useI18n();

const searchQuery = ref('');
const showSearch = computed(() => {
  return route.path.startsWith('/download');
});

const currentKey = computed(() => route.path);
const lang = computed({
  get: () => currentLang.value,
  set: (val: Lang) => setLang(val)
});

const langOptions = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
  { label: '日本語', value: 'ja' },
];

function handleMenuSelect(key: string) {
  router.push(key);
}

function goHome() {
  router.push('/about');
}

const menuOptions = computed(() => [
  {
    label: t.value('about'),
    key: '/about',
    icon: () => h(NIcon, null, { default: () => h(InformationCircleOutline) })
  },
  {
    label: t.value('download'),
    key: '/download',
    icon: () => h(NIcon, null, { default: () => h(DownloadOutline) }),
    children: [
      {
        label: t.value('byTable'),
        key: '/download/by-table',
        icon: () => h(NIcon, null, { default: () => h(ListOutline) })
      },
      {
        label: t.value('byEvent'),
        key: '/download/by-event',
        icon: () => h(NIcon, null, { default: () => h(CalendarOutline) })
      },
      {
        label: t.value('all'),
        key: '/download/all',
        icon: () => h(NIcon, null, { default: () => h(FolderOutline) })
      }
    ]
  }
]);

function onSearch(value: string) {
  window.dispatchEvent(new CustomEvent('search-update', { detail: value }));
}

watch(route, () => {
  searchQuery.value = '';
});
</script>

<style scoped>
.sider {
  background: var(--n-color);
  border-right: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
  display: flex;
  flex-direction: column;
}

.logo {
  border-bottom: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.logo:hover {
  background-color: var(--n-color-hover, rgba(0, 0, 0, 0.02));
}

.logo-img {
  max-width: 100%;
  height: auto;
  max-height: 48px;
}

.menu {
  padding: 8px;
  flex: 1;
}

.lang-switch {
  padding: 8px 12px 12px;
  border-top: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}

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
