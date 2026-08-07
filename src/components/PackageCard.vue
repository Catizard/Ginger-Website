<!-- Render a card component for a bms package -->
<template>
  <div class="package-card" :class="{ 'package-card--expanded': isHover }">
    <div class="card-row">
      <div class="card-thumb">
        <n-image :src="backURL" :width="100" :height="100" object-fit="cover" object-poisition="center" lazy />
      </div>
      <div class="card-body" :style="{ backgroundImage: `url(${backURL})` }">
        <div class="overlay">
          <n-h3 style="color: white; margin-bottom: 5px;">{{ fileName }}</n-h3>
          <n-flex align="center">
            <n-icon :component="icons.download" size="15px" />
            {{ downloadCount }}
            <n-icon :component="icons.clock" size="15px" />
            <n-time unix type="date" :time="createTime" />
            <n-icon :component="icons.document" size="15px" />
            {{ humanFileSize(fileSize) }}
          </n-flex>
        </div>
        <div class="meta-area" @mouseenter="isHover = true" @mouseout="isHover = false">
          <n-tag v-for="item in modeDetails" :key="item.name" size="tiny" :color="item.color">
            {{ item.name }}
            <n-divider vertical style="margin: 2px;" />
            {{ item.count }}
          </n-tag>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isHover" class="detail-list">
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
import { computed, ref } from 'vue';
import { icons } from "@/utils/icons";
import { humanFileSize } from '@/utils/format';
import type { SongData } from '@/api/songs';
import { getPlayModeColorSchema, type TagColor } from './tag';

const { fileName, fileSize, downloadCount, createTime, songs = [] } = defineProps<{
  fileName: String,
  fileSize: number,
  downloadCount: number,
  createTime: number,
  songs: SongData[]
}>()

const backURL = ref("https://cdn.luogu.com.cn/upload/image_hosting/4q21epwd.png");
const isHover = ref(false);

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
  songs.forEach(song => {
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
  return songs.map(song => {
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
  flex-shrink: 0;
  height: 100px;
}

.card-thumb {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.card-body {
  display: flex;
  flex: 1;
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  overflow-y: auto;
}

.meta-area {
  height: 20px;
  flex-shrink: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding-left: 5px;
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
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
