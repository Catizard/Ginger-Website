<!-- Render the switch component for language options, or a tag when side bar is collapsed -->
<template>
  <n-flex v-if="collapsed" vertical align="center">
    <n-tag type="info">
      {{ locale == 'en' ? "EN" : "ZH" }}
    </n-tag>
  </n-flex>
  <div v-else class="lang-switch">
    <n-select @update:value="handleSelectLang" :defaultValue="locale" :options="langOptions" size="small" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { setLocale, type Lang } from '@/i18n';

const { collapsed } = defineProps<{
  collapsed: boolean
}>()

const { locale } = useI18n();

function handleSelectLang(lang: Lang) {
  setLocale(lang);
}

const langOptions = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
];
</script>

<style lang="css" scoped>
.lang-switch {
  padding: 8px 12px 12px;
  border-top: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}
</style>
