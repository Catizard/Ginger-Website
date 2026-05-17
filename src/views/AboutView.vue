<template>
  <n-space vertical :size="24">
    <n-card class="about-card" :bordered="false">
      <template #header>
        <n-flex align="center">
          <n-icon :component="InformationCircleOutline" size="24" color="var(--n-primary-color)" />
          <n-text strong style="font-size: 20px;">{{ t('aboutTitle') }}</n-text>
        </n-flex>
      </template>
      <n-space vertical :size="16">
        <n-text style="line-height: 1.8;">
          {{ t('aboutDesc') }}
        </n-text>
        <n-divider />
        <n-space vertical :size="12">
          <n-flex align="center">
            <n-icon :component="DownloadOutline" size="20" color="var(--n-primary-color)" />
            <n-text strong>{{ t('bmsDownload') }}</n-text>
          </n-flex>
          <n-text depth="3" style="margin-left: 28px;">{{ t('bmsDownloadDesc') }}</n-text>
        </n-space>
        <n-space vertical :size="12">
          <n-flex align="center">
            <n-icon :component="ListOutline" size="20" color="var(--n-primary-color)" />
            <n-text strong>{{ t('tableBrowse') }}</n-text>
          </n-flex>
          <n-text depth="3" style="margin-left: 28px;">{{ t('tableBrowseDesc') }}</n-text>
        </n-space>
      </n-space>
    </n-card>

    <n-card class="about-card" :bordered="false" title="Request to upload a package">
      <template #header>
        <n-flex align="center">
          <n-icon :component="CloudUploadOutline" size="24" color="var(--n-primary-color)" />
          <n-text strong style="font-size: 20px;">{{ t('uploadPackageTitle') }}</n-text>
        </n-flex>
      </template>
      <n-space vertical :size="16">
        <n-text style="line-height: 1.8;">
          {{ t('uploadPackageDesc') }}
        </n-text>
        <n-text style="line-height: 1.8;">
          {{ t('uploadPackageStep1') }}
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
        <n-text style="line-height: 1.8;" v-html="t('uploadPackageStep2')"></n-text>
        <n-text style="line-height: 1.8;" v-html="t('uploadPackageStep3')"></n-text>
      </n-space>
    </n-card>

    <n-card class="about-card" :bordered="false">
      <template #header>
        <n-flex align="center">
          <n-icon :component="PeopleOutline" size="24" color="var(--n-primary-color)" />
          <n-text strong style="font-size: 20px;">{{ t('contributors') }}</n-text>
        </n-flex>
      </template>
      <n-list>
        <n-list-item v-for="contributor in contributors" :key="contributor.name" class="contributor-item"
          @click="openLink(contributor.url)">
          <n-flex align="center">
            <n-text strong class="contributor-name">{{ contributor.name }}</n-text>
          </n-flex>
        </n-list-item>
      </n-list>
    </n-card>

  </n-space>
</template>

<script setup lang="ts">
import { InformationCircleOutline, DownloadOutline, ListOutline, PeopleOutline, CloudUploadOutline } from '@vicons/ionicons5';
import { useI18n } from '@/i18n';

const { t } = useI18n();

const contributors = [
  { name: 'Catizard', url: 'https://github.com/Catizard' },
  { name: 'nyannurs', url: 'https://www.twitch.tv/beachsidebunny' },
  { name: "Seraxis", url: 'https://github.com/seraxis' },
  { name: '闯', url: 'https://chuang1213.github.io/' },
];

function openLink(url: string) {
  window.open(url, '_blank');
}
</script>

<style scoped>
.about-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}

.contributor-item {
  border-radius: 8px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.contributor-item:hover {
  background-color: var(--n-color-hover, rgba(0, 0, 0, 0.02));
}

.contributor-name {
  transition: color 0.2s ease;
}

.contributor-item:hover .contributor-name {
  color: var(--n-primary-color);
}

:deep(.n-card-header) {
  padding-bottom: 16px;
}

:deep(.n-list-item) {
  padding: 12px 16px;
  border-radius: 8px;
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
