<template>
  <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="220" :native-scrollbar="false"
    class="sider">
    <div class="logo" @click="handleClickLogo">
      <img src="/gingerrush-title+logo.png" alt="Ginger Rush" class="logo-img" />
    </div>
    <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" class="menu"
      defaultValue="/admin/table/manage" />
    <div class="lang-switch">
      <n-select @update:value="handleSelectLang" :defaultValue="locale" :options="langOptions" size="small" />
    </div>
  </n-layout-sider>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { setLocale, type Lang } from '@/i18n';
import { NIcon } from 'naive-ui';
import { computed, h, type Component } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { DownloadOutline, ListOutline } from '@vicons/ionicons5';

const router = useRouter();
const { t, locale } = useI18n();

function handleSelectLang(lang: Lang) {
  setLocale(lang);
}

function handleClickLogo() {
  router.push('/about');
}

const langOptions = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
  { label: '日本語', value: 'ja' },
];

const menuOptions = computed(() => [
  {
    label: t('menu.admin.table.table'),
    key: '/admin/table',
    icon: renderIcon(DownloadOutline),
    children: [
      {
        label: renderOption("/admin/table/manage", t('menu.admin.table.manage')),
        key: '/admin/table/manage',
        icon: renderIcon(ListOutline),
      },
      {
        label: renderOption("/admin/table/category", t('menu.admin.table.category')),
        key: '/admin/table/category',
        icon: renderIcon(ListOutline)
      },
      {
        label: renderOption("/admin/table/special", t("menu.admin.table.special")),
        key: "/admin/table/special",
        icon: renderIcon(ListOutline)
      }
    ]
  },
  {
    label: t('menu.admin.tag.tag'),
    key: '/admin/tag',
    icon: renderIcon(DownloadOutline),
    children: [
      {
        label: renderOption("/admin/tag/manage", t('menu.admin.tag.manage')),
        key: "/admin/tag/manage",
        icon: renderIcon(ListOutline),
      }
    ]
  }
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
