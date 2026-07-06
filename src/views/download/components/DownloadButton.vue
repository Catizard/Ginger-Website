<!-- A simple button that opens the direct download link when clicking -->
<template>
  <NButton type="info" round size="small" @click="open">
    <template #icon>
      <NIcon :component="DownloadIcon" />
    </template>
    {{ t('button.download') }}
  </NButton>
</template>

<script setup lang="tsx">
import { NButton, NIcon } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import { DownloadOutline as DownloadIcon } from "@vicons/ionicons5";

const { t } = useI18n();
const props = defineProps<{
  downloadURL: string,
}>();

function open() {
  window.open(props.downloadURL, '_blank');
}
</script>
