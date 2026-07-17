<template>
  <n-space vertical :size="24">
    <n-card class="about-card" :bordered="false">
      <template #header>
        <n-flex align="center">
          <n-icon :component="CloudUploadOutline" size="24" color="var(--n-primary-color)" />
          <n-text strong style="font-size: 20px;">{{ t('title.uploadPackage') }}</n-text>
        </n-flex>
      </template>
      <n-space vertical :size="16">
        <n-text style="line-height: 1.8;">
          {{ t('desc.uploadPackage.overview') }}
        </n-text>
        <n-text style="line-height: 1.8;">
          {{ t('desc.uploadPackage.step1') }}
        </n-text>
        <pre class="package-tree">
          硬核機動
          ├── Kokaku_whiteout.bmp
          ├── oppo7.bms
          ├── preview_music.ogg
          ├── 新しいテキスト ドキュメント.txt
          ├── 硬核機動_DPA_.bms
          ├── 硬核機動_DPA.bms
          ├── 硬核機動_DPH.bms
          ├── 硬核機動_DPN.bms
          ├── 硬核機動[5K].bms
          ├── 硬核機動[9KEYS-H].pms
          └── .......
        </pre>
        <n-text style="line-height: 1.8;" v-html="t('desc.uploadPackage.step2')"></n-text>
        <n-text style="line-height: 1.8;" v-html="t('desc.uploadPackage.step3')"></n-text>
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { CloudUploadOutline } from '@vicons/ionicons5';
import { useI18n } from 'vue-i18n';
import { NFlex } from 'naive-ui';

const { t } = useI18n();
</script>

<style scoped>
.about-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}

:deep(.n-card-header) {
  padding-bottom: 16px;
}

.package-tree {
  background-color: var(--n-code-color, rgba(0, 0, 0, 0.04));
  padding: 12px 16px;
  border-radius: 8px;
  font-family: monospace;
  overflow-x: auto;
  line-height: 1.6;
}
</style>
