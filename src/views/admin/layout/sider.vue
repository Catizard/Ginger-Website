<template>
  <n-layout-sider :collapsed="collapsed" bordered collapse-mode="width" :collapsed-width="64" :width="220"
    :native-scrollbar="false" class="sider" show-trigger @collapse="collapsed = true" @expand="collapsed = false">
    <Logo :collapsed="collapsed" />
    <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" class="menu"
      defaultValue="/admin/table/manage" />
    <lang-switch :collapsed="collapsed" />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NIcon } from 'naive-ui';
import { computed, h, ref, type Component } from 'vue';
import { RouterLink } from 'vue-router';
import { BookOutline, CompassOutline, FileTrayFullOutline, GridOutline, ListOutline, PricetagOutline, ReceiptOutline, Eye, DocumentTextOutline, Analytics, DocumentsOutline, AlbumsOutline } from '@vicons/ionicons5';
import { QuestionMarkOutlined } from '@vicons/material';
import Logo from '@/components/Logo.vue';
import LangSwitch from '@/components/LangSwitch.vue';

const { t } = useI18n();

const collapsed = ref(false);

const menuOptions = computed(() => [
  {
    label: t('menu.admin.table.table'),
    key: '/admin/table',
    icon: renderIcon(BookOutline),
    children: [
      {
        label: renderOption("/admin/table/manage", t('menu.admin.table.manage')),
        key: '/admin/table/manage',
        icon: renderIcon(ListOutline),
      },
      {
        label: renderOption("/admin/table/category", t('menu.admin.table.category')),
        key: '/admin/table/category',
        icon: renderIcon(GridOutline)
      },
      {
        label: renderOption("/admin/table/special", t("menu.admin.table.special")),
        key: "/admin/table/special",
        icon: renderIcon(CompassOutline)
      }
    ]
  },
  {
    label: t('menu.admin.tag.tag'),
    key: '/admin/tag',
    icon: renderIcon(PricetagOutline),
    children: [
      {
        label: renderOption("/admin/tag/manage", t('menu.admin.tag.manage')),
        key: "/admin/tag/manage",
        icon: renderIcon(ListOutline),
      }
    ]
  },
  {
    label: t('menu.admin.files.filesStorage'),
    key: "admin/files",
    icon: renderIcon(FileTrayFullOutline),
    children: [
      {
        label: renderOption("/admin/files/manage", t('menu.admin.files.manage')),
        key: "/admin/files/manage",
        icon: renderIcon(ListOutline)
      },
      {
        label: renderOption("/admin/files/sabuns", t('menu.admin.files.sabuns')),
        key: "/admin/files/sabuns",
        icon: renderIcon(DocumentTextOutline)
      },
      {
        label: renderOption("/admin/files/log", t('menu.admin.files.log')),
        key: "/admin/files/log",
        icon: renderIcon(ReceiptOutline)
      }
    ]
  },
  {
    label: t('menu.admin.monitor.monitor'),
    key: "admin/monitor",
    icon: renderIcon(Eye),
    children: [
      {
        label: renderOption("/admin/monitor/pendingFiles", t("menu.admin.monitor.pendingFiles")),
        key: "/admin/monitor/pendingFiles",
        icon: renderIcon(AlbumsOutline)
      },
      {
        label: renderOption("/admin/monitor/reconcileRuns", t("menu.admin.monitor.reconcileRuns")),
        key: "/admin/monitor/reconcileRuns",
        icon: renderIcon(Analytics)
      },
      {
        label: renderOption("/admin/monitor/missingSabuns", t("menu.admin.monitor.missingSabuns")),
        key: "/admin/monitor/missingSabuns",
        icon: renderIcon(QuestionMarkOutlined),
      },
      {
        label: renderOption("/admin/monitor/mismatchFiles", t('menu.admin.monitor.mismatchFiles')),
        key: "/admin/monitor/mismatchFiles",
        icon: renderIcon(DocumentsOutline)
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
</style>
