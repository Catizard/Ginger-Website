<template>
  <TitleWithButtons :title="t('title.contributors')" />
  <n-flex justify="start" horizontal>
    <n-card class="about-card" :bordered="false" style="width: 49%;" :wrap="false">
      <template #header>
        <n-flex align="center">
          <n-icon :component="PeopleOutline" size="24" color="var(--n-primary-color)" />
          <n-text strong style="font-size: 20px;">{{ t('title.codeContributors') }}</n-text>
        </n-flex>
      </template>
      <n-list>
        <n-list-item v-for="contributor in codeContributors" :key="contributor.name" class="contributor-item"
          @click="openLink(contributor.url)">
          <n-flex align="center">
            <n-avatar round size="small" :src="contributor.avatarURL" />
            <n-text strong class="contributor-name">{{ contributor.name }}</n-text>
          </n-flex>
        </n-list-item>
      </n-list>
    </n-card>
    <n-card class="about-card" :bordered="false" style="width: 49%; margin-left: auto;">
      <template #header>
        <n-flex align="center">
          <n-icon :component="HandshakeRound" size="24" color="var(--n-primary-color)" />
          <n-text strong style="font-size: 20px;">{{ t('title.specialThanks') }}</n-text>
        </n-flex>
      </template>
      <n-list>
        <n-list-item v-for="contributor in specialThanks" :key="contributor.name" class="contributor-item"
          @click="openLink(contributor.url)">
          <n-flex align="center">
            <n-avatar round size="small" :src="contributor.avatarURL" />
            <n-text strong class="contributor-name">{{ contributor.name }}</n-text>
          </n-flex>
        </n-list-item>
      </n-list>
    </n-card>
  </n-flex>
</template>

<script setup lang="tsx">
import { PeopleOutline } from "@vicons/ionicons5";
import { useI18n } from "vue-i18n";
import TitleWithButtons from "@/components/TitleWithButtons.vue";
import { HandshakeRound } from "@vicons/material";

const { t } = useI18n();

const codeContributors = [
  { name: 'Catizard', url: 'https://github.com/Catizard', avatarURL: "https://github.com/Catizard.png" },
  { name: '闯', url: 'https://github.com/chuang1213', avatarURL: 'https://github.com/chuang1213.png' },
];

const specialThanks = [
  { name: 'nyannurs', url: 'https://www.twitch.tv/beachsidebunny', avatarURL: "https://github.com/nyannurs.png" },
  { name: "Seraxis", url: 'https://github.com/seraxis', avatarURL: 'https://github.com/seraxis.png' },
  { name: "Rai", url: 'https://github.com/radiden', avatarURL: 'https://github.com/radiden.png' },
  { name: "Yuntian", url: "https://github.com/Yuntian52s", avatarURL: "https://github.com/Yuntian52s.png" }
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

:deep(.n-card-header) {
  padding-bottom: 16px;
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

:deep(.n-list-item) {
  padding: 12px 16px;
  border-radius: 8px;
}
</style>
