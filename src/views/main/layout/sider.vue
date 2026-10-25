<template>
  <n-layout-sider :collapsed="collapsed" bordered collapse-mode="width" :collapsed-width="64" :width="siderWidth"
    :native-scrollbar="false" class="sider" :show-trigger="!hideTrigger" @collapse="collapsed = true" @expand="collapsed = false">
    <Logo :collapsed="collapsed" />
    <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" class="menu"
      defaultValue="/download/list" />
    <LangSwitch :collapsed="collapsed" />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NIcon } from 'naive-ui';
import { computed, h, ref, type Component } from 'vue';
import { RouterLink } from 'vue-router';
import {
  InformationCircleOutline,
  DownloadOutline,
  ListOutline,
  CalendarOutline,
  FolderOutline,
  Help,
  BonfireOutline,
} from '@vicons/ionicons5';
import Logo from '@/components/Logo.vue';
import LangSwitch from '@/components/LangSwitch.vue';

const props = withDefaults(defineProps<{
  hideTrigger?: boolean,
}>(), {
  hideTrigger: false,
});

const { t } = useI18n();
const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
const collapsed = ref(tabletQuery.matches);
tabletQuery.addEventListener('change', e => {
  collapsed.value = e.matches;
});

const siderWidth = computed(() => props.hideTrigger ? '100%' : 220);

const menuOptions = computed(() => [
  {
    label: t('menu.download.download'),
    key: '/download',
    icon: renderIcon(DownloadOutline),
    children: [
      {
        label: renderOption("/download/select/TABLE", t('menu.download.byTable')),
        key: '/download/select/TABLE',
        icon: renderIcon(ListOutline),
      },
      {
        label: renderOption("/download/select/EVENT", t('menu.download.byEvent')),
        key: '/download/select/EVENT',
        icon: renderIcon(CalendarOutline),
      },
      {
        label: renderOption("/download/list", t("menu.download.all")),
        key: '/download/list',
        icon: renderIcon(FolderOutline),
      },
    ]
  },
  {
    label: renderOption("/integrations", t("menu.integrations")),
    key: "/integrations",
    icon: renderIcon(BonfireOutline)
  },
  {
    label: renderOption("/missing", t('menu.missing')),
    key: "/missing",
    icon: renderIcon(Help),
  },
  {
    label: renderOption("/faq", t('menu.faq')),
    key: '/faq',
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
</style>
