<!-- A wrapped delete button for files -->
<template>
  <DownloadButton :downloadURL="fileEntry.downloadURL" :disabled="packageBanned" />
</template>

<script setup lang="tsx">
import type { FileEntryDto } from '@/api/files';
import DownloadButton from './DownloadButton.vue';
import { computed } from 'vue';

const { fileEntry } = defineProps<{
  fileEntry: FileEntryDto,
}>();

const packageBanned = computed<boolean>(() => {
  console.log('fileEntry: ', fileEntry);
  return fileEntry.banned != 0;
});
</script>
