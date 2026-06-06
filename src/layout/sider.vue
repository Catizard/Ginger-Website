<template>
  <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="220" :native-scrollbar="false"
    class="sider">
    <div class="logo" @click="handleClickLogo">
      <img src="/gingerrush-title+logo.png" alt="Ginger Rush" class="logo-img" />
    </div>
    <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" class="menu"
      defaultValue="/download/list" />
    <div class="lang-switch">
      <n-select v-model:value="lang" :options="langOptions" size="small" />
    </div>
  </n-layout-sider>
</template>

<script setup lang="ts">
import { useI18n, type Lang } from '@/i18n';
import { NIcon } from 'naive-ui';
import { computed, h, type Component } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import {
  InformationCircleOutline,
  DownloadOutline,
  ListOutline,
  CalendarOutline,
  FolderOutline,
  Help
} from '@vicons/ionicons5';

const router = useRouter();
const { t, currentLang, setLang } = useI18n();

function handleClickLogo() {
  router.push('/about');
}

const lang = computed({
  get: () => currentLang.value,
  set: (val: Lang) => setLang(val)
});

const langOptions = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
  { label: '日本語', value: 'ja' },
];

const menuOptions = computed(() => [
  {
    label: t.value('download'),
    key: '/download',
    icon: renderIcon(DownloadOutline),
    children: [
      {
        label: renderOption("/download/select/TABLE", t.value('byTable')),
        key: '/download/select/TABLE',
        icon: renderIcon(ListOutline),
      },
      {
        label: renderOption("/download/select/EVENT", t.value('byEvent')),
        key: '/download/select/EVENT',
        icon: renderIcon(CalendarOutline),
      },
      {
        label: renderOption("/download/list", t.value("all")),
        key: '/download/list',
        icon: renderIcon(FolderOutline),
      },
    ]
  },
  {
    label: renderOption("/missing", t.value('missing')),
    key: "/missing",
    icon: renderIcon(Help),
  },
  {
    label: renderOption("/about", t.value('about')),
    key: '/about',
    icon: renderIcon(InformationCircleOutline),
  },
]);

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function renderOption(path: string, name: string) {
  return () => h(
    RouterLink,
    { to: path },
    { default: () => name }
  );
}
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
</style>
