<template>
  <n-layout-header>
    <n-menu mode="horizontal" :inverted="inverted" :collapsed-width="64" :collapsed-icon-size="22"
      :options="menuOptions" defaultValue="home" />
  </n-layout-header>
</template>

<script lang="ts" setup>
import type { Component } from 'vue'
import {
  BookOutline as TableIcon,
  PersonOutline as PersonIcon,
  Bookmarks as BookmarksIcon,
  TimeOutline as TimeIcon,
  SettingsOutline as SettingsIcon,
  SchoolOutline as CoursesIcon,
  StatsChart as StatisticIcon,
  MedalOutline as MedalIcon,
  People as RivalIcon,
  List as ListIcon,
  DownloadOutline as DownloadIcon,
  ColorWand as CustomTableIcon,
  Pencil as PencilIcon,
  SnowOutline as LockIcon,
  MusicalNotes as SongIcon,
  Flag,
  DownloadOutline
} from '@vicons/ionicons5'
import { type MenuOption, NIcon } from 'naive-ui'
import { h, ref } from 'vue'
import { RouterLink } from 'vue-router';

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

const inverted = ref(false);
const menuOptions: MenuOption[] = [
  {
    label: renderOption("/home", "Home"),
    key: 'home',
    icon: renderIcon(DownloadIcon)
  },
  {
    label: renderOption("/table", "Table"),
    key: 'table',
    icon: renderIcon(TableIcon)
  },
  {
    label: renderOption("/about", "About"),
    key: 'about',
    icon: renderIcon(BookmarksIcon)
  }
]
</script>

<style scoped>
.logo {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  padding: 12px 20px;
  background: var(--n-color);
  text-decoration: none;
}

.n-layout-sider--collapsed .logo {
  padding: 9px;
}

.logo svg {
  height: 32px;
}

/*
:deep(.n-menu > .n-menu-item:last-child) {
  position: absolute;
  bottom: 10px;
  width: 100%;
}
*/
</style>
