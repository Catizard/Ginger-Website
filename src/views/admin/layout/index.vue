<template>
  <n-layout has-sider position="absolute">
    <Sider />
    <n-layout-content :native-scrollbar="false" class="content">
      <div class="content-wrapper">
        <div class="content-inner">
          <router-view />
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts" setup>
import Sider from "./sider.vue";

</script>

<style scoped>
.content {
  background: var(--n-color-muted, #f5f5f5);
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}



.content-inner {
  flex: 1;
  padding: 24px;
}
</style>
