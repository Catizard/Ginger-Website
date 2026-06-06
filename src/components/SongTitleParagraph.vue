<template>
  <n-flex vertical :size="4">
    <n-flex>
      <n-icon v-if="lost" :component="WarningOutline" color="red" />
      <strong style="font-size: 1.1em;">{{ data.title }}</strong>
    </n-flex>
    <n-text v-if="data.artist != ''" depth="3" style="font-size: 0.9em;">{{ data.artist }}</n-text>
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
