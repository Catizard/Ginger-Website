<!-- Render a card component for a bms package -->
<template>
  <div class="package-card" :class="{ 'package-card--expanded': isHover }">
    <div class="card-row">
      <div class="card-thumb">
        <n-image :src="backURL" :width="100" :height="100" object-fit="cover" object-poisition="center" lazy />
      </div>
      <div class="card-body" :style="{ backgroundImage: `url(${backURL})` }">
        <div class="overlay">
          <n-h3 style="color: white; margin-bottom: 5px;">我是这个包的名字</n-h3>
          <n-p style="color: white; margin-top: 5px;">现在还没内容</n-p>
        </div>
        <div class="meta-area" @mouseenter="isHover = true" @mouseout="isHover = false">
          <n-tag type="info" size="tiny" :color="{ color: '#C5E7D0', textColor: '#47755A' }">
            7-BMS
            <n-divider vertical style="margin: 2px" />
            2
          </n-tag>
          <n-tag type="info" size="tiny" :color="{ color: '#F1E7B4', textColor: '#7B6A33' }">
            9-PMS
            <n-divider vertical style="margin: 2px" />
            11
          </n-tag>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isHover" class="detail-list">
        <div class="detail-item">
          <n-tag type="info" size="tiny" :color="{ color: '#C5E7D0', textColor: '#47755A' }">
            7-BMS
          </n-tag>
          <span strong>A Sabun's title, or not</span>
        </div>

        <div class="detail-item">
          <n-tag type="info" size="tiny" :color="{ color: '#C5E7D0', textColor: '#47755A' }">
            7-BMS
          </n-tag>
          <span strong>A Sabun's title, freedom dive!!!</span>
        </div>

        <div class="detail-item">
          <n-tag type="info" size="tiny" :color="{ color: '#F1E7B4', textColor: '#7B6A33' }">
            9-PMS
          </n-tag>
          <span strong>A Sabun's title. No idea what should i put here blah blah blah test super long </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';

const backURL = ref("https://cdn.luogu.com.cn/upload/image_hosting/4q21epwd.png");
const isHover = ref(false);
</script>

<style lang="css" scoped>
.package-card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 100px;
}

.package-card--expanded {
  height: auto;
  border-color: #4a90e2;
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
  width: 100%;
  background: #f9f9f9;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.75rem;
  border-top: 1px solid #eee;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
