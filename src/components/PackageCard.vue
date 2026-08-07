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
          1122334455
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isHover" class="detail-list">
        <div class="detail-item">
          <span class="level">123</span>
          <span class="title">456</span>
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
  background-color: red;
  flex-shrink: 0;
  z-index: 1;
}

.detail-list {
  width: 100%;
  /* 占满卡片宽度 */
  background: #f9f9f9;
  padding: 8px 12px;
  display: flex;
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
