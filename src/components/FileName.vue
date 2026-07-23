<!-- Render the package's name, and when the package is potentially a wrong package, render a warning icon with it -->
<template>
  <n-flex vertical :size="4">
    <n-flex inline style="gap: 8px 6px; align-items: center;">
      <n-popover trigger="hover">
        <template #trigger>
          <div>
            <n-icon size="18" v-if="isWrong" :component="icons.warning" color="red" />
          </div>
        </template>
        <n-text>
          {{ t('desc.packageIsPotentiallyBroken') }}
        </n-text>
      </n-popover>
      <strong style="font-size: 1.1em">
        {{ fileName }}
      </strong>
      <n-popover trigger="hover">
        <template #trigger>
          <div>
            <n-icon size="18" v-if="fileEntry.banned" :component="icons.error" color="red" />
          </div>
        </template>
        <n-text v-if="fileEntry.bannedReason == ''">
          {{ t('desc.packageIsBannedWithReason', { "reason": fileEntry.bannedReason }) }}
        </n-text>
        <n-text v-else>
          {{ t('desc.packageIsBanned') }}
        </n-text>
      </n-popover>
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import type { FileEntryDto } from '@/api/files';
import { computed } from 'vue';
import { icons } from '@/utils/icons';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const audioExts = [".ogg", ".wav", ".flac", ".mp3"]

const { fileEntry } = defineProps<{
  fileEntry: FileEntryDto
}>();

const fileName = computed<string>(() => {
  return fileEntry.fileName;
});

const isWrong = computed<boolean>(() => {
  // No audio file is attached or no sabun inside
  return !Object.keys(fileEntry.fileManifest).some(key => audioExts.includes(key.toLowerCase())) || fileEntry.songCount == 0;
});

</script>
