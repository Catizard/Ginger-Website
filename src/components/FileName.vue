<!-- Render the package's name, and when the package is potentially a wrong package, render a warning icon with it -->
<template>
  <n-flex vertical :size="4">
    <n-flex inline style="gap: 8px 6px; align-items: center;">
      <n-icon size="18" v-if="isWrong" :component="icons.warning" color="red" />
      <strong style="font-size: 1.1em">
        {{ fileName }}
      </strong>
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import type { FileEntryDto } from '@/api/files';
import { computed } from 'vue';
import { icons } from '@/utils/icons';

const audioExts = [".ogg", ".wav", ".flac", ".mp3"]

const { fileEntry } = defineProps<{
  fileEntry: FileEntryDto
}>();

const fileName = computed<string>(() => {
  return fileEntry.fileName;
});

const isWrong = computed<boolean>(() => {
  // No audio file is attached
  return !Object.keys(fileEntry.fileManifest).some(key => audioExts.includes(key.toLowerCase()));
})
</script>
