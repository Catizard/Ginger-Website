<!-- Render a card component for a bms package -->
<template>
  <div ref="rootRef" class="package-card" :class="{ 'package-card--expanded': detailsOpen }"
    @mouseenter="handleCardEnter" @mouseleave="scheduleClose">
    <div class="card-row">
      <div class="card-thumb" :style="!backBMPURL ? { backgroundColor: '#2A2A2A' } : {}">
        <n-image v-if="backBMPURL" :src="backBMPURL" :width="100" :height="100" object-fit="cover"
          object-poisition="center" lazy />
      </div>
      <div class="card-body" :style="cardBodyBackgroundStyle">
        <div class="overlay">
          <n-h3 style="color: white; margin-bottom: 5px;">{{ fileEntry.fileName }}</n-h3>
          <n-flex align="center">
            <n-icon :component="icons.download" size="15px" />
            {{ fileEntry.accessCount }}
            <n-icon :component="icons.clock" size="15px" />
            <n-time unix type="date" :time="fileEntry.createTime" />
            <n-icon :component="icons.document" size="15px" />
            {{ humanFileSize(fileEntry.fileSize) }}
          </n-flex>
        </div>
        <div class="meta-area" @click="handleMetaClick">
          <span class="mode-chip" v-for="item in modeDetails" :key="item.name" :style="{
            '--chip-bg': item.color.color,
            '--chip-text': item.color.textColor,
            '--chip-border': item.color.borderColor,
          }">
            <span class="mode-chip__name">{{ item.name }}</span>
            <span class="mode-chip__count">{{ item.count }}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="hover-overlay" @click.stop="handleClickDownload">
      <n-icon size="36" :component="icons.download" color="white" />
    </div>

    <transition name="details">
      <div v-if="detailsOpen" class="detail-list">
        <div class="detail-title">{{ fileEntry.fileName }}</div>
        <div class="detail-item" v-for="item in songDetails" :key="item.id">
          <n-tag size="tiny" :color="item.color">
            {{ item.modeName }}
          </n-tag>
          <span strong>{{ item.title }} {{ item.subTitle }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="tsx">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { icons } from "@/utils/icons";
import { humanFileSize } from '@/utils/format';
import { getPlayModeColorSchema, type TagColor } from './tag';
import type { FileEntryDto } from '@/api/files';

const { fileEntry } = defineProps<{
  fileEntry: FileEntryDto
}>()

const rootRef = ref<HTMLElement | null>(null);
const detailsOpen = ref(false);
const isTouch = window.matchMedia('(hover: none)').matches;

let openTimer: ReturnType<typeof setTimeout> | null = null;
let closeTimer: ReturnType<typeof setTimeout> | null = null;

function cancelOpen() {
  if (openTimer != null) {
    clearTimeout(openTimer);
    openTimer = null;
  }
}

function cancelClose() {
  if (closeTimer != null) {
    clearTimeout(closeTimer);
    closeTimer = null;
  }
}

function scheduleOpen() {
  cancelClose();
  cancelOpen();
  openTimer = setTimeout(() => {
    detailsOpen.value = true;
  }, 100);
}

function scheduleClose() {
  cancelOpen();
  cancelClose();
  closeTimer = setTimeout(() => {
    detailsOpen.value = false;
  }, 220);
}

function handleCardEnter() {
  if (isTouch) {
    return;
  }
  scheduleOpen();
}

function handleMetaClick() {
  if (!isTouch) {
    return;
  }
  cancelOpen();
  cancelClose();
  detailsOpen.value = !detailsOpen.value;
}

function handleDocumentClick(e: MouseEvent) {
  if (!isTouch || !detailsOpen.value) {
    return;
  }
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    detailsOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
  cancelOpen();
  cancelClose();
});

export interface modeDetail {
  name: string,
  color: TagColor,
  count: number,
  orderIndex: number,
};

export interface songDetail {
  id: number,
  title: string,
  subTitle: string,
  modeName: string,
  color: TagColor,
  orderIndex: number,
}

const modeDetails = computed<modeDetail[]>(() => {
  const cnt = new Map<string, number>();
  fileEntry.songs.forEach(song => {
    const current = cnt.get(song.mode) || 0;
    cnt.set(song.mode, current + 1);
  })

  const ret = [] as modeDetail[];
  cnt.forEach((v, k) => {
    ret.push({
      count: v,
      name: convertModeName(k),
      color: getPlayModeColorSchema(k),
      orderIndex: convertModeOrderIndex(k),
    });
  });
  ret.sort((lhs: modeDetail, rhs: modeDetail): number => {
    return lhs.orderIndex - rhs.orderIndex;
  })
  return ret;
});

const songDetails = computed<songDetail[]>(() => {
  return fileEntry.songs.map(song => {
    return {
      id: song.id,
      title: song.title,
      subTitle: song.subTitle,
      orderIndex: convertModeOrderIndex(song.mode),
      modeName: convertModeName(song.mode),
      color: getPlayModeColorSchema(song.mode)
    }
  }).sort((lhs: songDetail, rhs: songDetail): number => {
    return lhs.orderIndex != rhs.orderIndex
      ? lhs.orderIndex - rhs.orderIndex
      : lhs.title.localeCompare(rhs.title)
  });
});

const bannerURL = computed<string>(() => {
  if (fileEntry.bannerURL != "") {
    return fileEntry.bannerURL;
  }
  if (fileEntry.backBMPURL != "") {
    return fileEntry.backBMPURL;
  }
  if (fileEntry.stageFileURL != "") {
    return fileEntry.stageFileURL;
  }
  return "";
});

const backBMPURL = computed<string>(() => {
  if (fileEntry.backBMPURL != "") {
    return fileEntry.backBMPURL;
  }
  if (fileEntry.bannerURL != "") {
    return fileEntry.bannerURL;
  }
  if (fileEntry.stageFileURL != "") {
    return fileEntry.stageFileURL;
  }
  return "";
});

const cardBodyBackgroundStyle = computed(() => {
  const url = backBMPURL.value
  return url ? { backgroundImage: `url(${url})` } : { backgroundColor: "#2A2A2a" }
})

function convertModeName(mode: string): string {
  switch (mode) {
    case "BEAT_5K":
    case "POPN_5K":
      return "5key";
    case "BEAT_7K": return "7key";
    case "POPN_9K": return "9key";
    case "BEAT_10K": return "10key";
    case "BEAT_14K": return "14key";
    default: return "?key"
  }
}

function convertModeOrderIndex(mode: string): number {
  switch (mode) {
    case "BEAT_5K":
    case "POPN_5K":
      return 2;
    case "BEAT_7K": return 0;
    case "POPN_9K": return 1;
    case "BEAT_10K": return 3;
    case "BEAT_14K": return 4;
    default: return 5;
  }
}

function handleClickDownload() {
  window.open(fileEntry.downloadURL, '_blank');
}

</script>

<style lang="css" scoped>
.package-card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: visible;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 100px;
  position: relative;
}

.package-card--expanded {
  border-color: #4a90e2;
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.card-row {
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  min-height: 100px;
}

.card-thumb {
  position: relative;
  width: 100px;
  height: auto;
  align-self: stretch;
  flex-shrink: 0;
  overflow: hidden;
}

.card-thumb :deep(.n-image) {
  position: absolute;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
}

.card-body {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  position: relative;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.card-body::before {
  content: '';
  position: absolute;
  inset: 0;
  background: inherit;
  filter: brightness(0.5);
  z-index: 0;
}

.overlay {
  flex: 1;
  position: relative;
  z-index: 1;
  color: white;
  margin: 5px 5px;
  min-width: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  overflow: visible;
}

.overlay :deep(h3) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail-list :deep(.n-tag) {
  padding: 0 10px;
  border-radius: 999px;
}

.detail-list :deep(.n-tag__content) {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.mode-chip {
  display: inline-flex;
  align-items: stretch;
  height: 18px;
  font-size: 12px;
  line-height: 1;
  color: var(--chip-text, #68717B);
  background: var(--chip-bg, #E3E5E7);
  border: 1px solid var(--chip-border, #68717B);
  border-radius: 999px;
  overflow: hidden;
}

.mode-chip__name {
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  border-radius: 999px 0 0 999px;
}

.mode-chip__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  padding: 0 7px;
  border-radius: 0 999px 999px 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08));
}

.meta-area {
  min-height: 20px;
  flex-shrink: 0;
  z-index: 6;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 0 5px 5px;
}

.detail-list {
  width: calc(100% + 4px);
  background: #f9f9f9;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.75rem;
  border: 2px solid;
  border-color: #4a90e2;
  border-top: none;
  border-radius: 0 0 8px 8px;
  position: absolute;
  top: 100%;
  left: -2px;
  z-index: 10;
  max-height: 50vh;
  overflow-y: auto;
}

.details-enter-active {
  transition: opacity 180ms ease-out, transform 180ms ease-out;
}

.details-leave-active {
  transition: opacity 140ms ease-out, transform 140ms ease-out;
}

.details-enter-from,
.details-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {

  .details-enter-active,
  .details-leave-active {
    transition: none;
  }

  .details-enter-from,
  .details-leave-to {
    transform: none;
  }
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.detail-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #333;
  white-space: normal;
  overflow-wrap: anywhere;
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  border-radius: 8px;
  transition: background 0.3s;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
}

.package-card:hover .hover-overlay {
  opacity: 1;
  pointer-events: auto;
}

.hover-overlay:hover {
  background: rgba(0, 0, 0, 0.3);
}

@media (hover: none) {
  .hover-overlay {
    opacity: 1;
    pointer-events: auto;
    background: rgba(0, 0, 0, 0.25);
    align-items: flex-end;
    justify-content: flex-end;
    padding: 8px;
  }
}

@media (max-width: 767px) {
  .package-card {
    min-height: 80px;
  }

  .card-row {
    min-height: 80px;
  }

  .card-thumb {
    width: 80px;
  }
}
</style>
