<template>
  <n-flex vertical :size="4">
    <n-flex inline style="gap: 8px 6px; align-items: center;">
      <n-icon class="lined-icon" size="18" v-if="lost" :component="WarningOutline" color="red" />
      <strong style="font-size: 1.1em;">
        {{ fullSongTitle }}
      </strong>
    </n-flex>
    <n-text v-if="data.artist != ''" depth="3" style="font-size: 0.9em; line-height: 18px;">{{ data.artist }}</n-text>
  </n-flex>
</template>

<script setup lang="ts">
import type { SongData } from '@/api/songs';
import type { DownloadableTableDataDto, MissingTableData } from '@/api/table';
import { WarningOutline } from '@vicons/ionicons5';
import { computed } from 'vue';

type HasSongTitle = DownloadableTableDataDto | MissingTableData | SongData;

const { data, lost } = defineProps<{
  data: HasSongTitle,
  lost?: boolean
}>();

// TODO: This is actually a problem in backend, difficult table's data should
//  have the sub title field while it doesn't. Therefore, we have to patch
//  it here.
const fullSongTitle = computed<string>(() => {
  if ("subTitle" in data) {
    return `${data.title} ${data.subTitle}`
  }
  return data.title;
});
</script>
