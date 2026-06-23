<template>
  <n-flex vertical :size="4">
    <n-flex inline style="gap: 8px 6px; align-items: center;">
      <n-icon class="lined-icon" size="18" v-if="lost" :component="WarningOutline" color="red" />
      <strong style="font-size: 1.1em;">{{ data.title }}</strong>
    </n-flex>
    <n-text v-if="data.artist != ''" depth="3" style="font-size: 0.9em; line-height: 18px;">{{ data.artist }}</n-text>
  </n-flex>
</template>

<script setup lang="ts">
import type { DownloadableTableDataDto, MissingTableData } from '@/api/table';
import { WarningOutline } from '@vicons/ionicons5';

const { data, lost } = defineProps<{
  data: DownloadableTableDataDto | MissingTableData,
  lost?: boolean
}>();
</script>
