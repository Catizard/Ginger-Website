<!-- Renders a card welcomes the users and presenting beginning hints & what's this website is for -->
<template>
  <!-- About the website -->
  <n-card class="about-card" :bordered="false" style="margin-top: 32px;">
    <template #header>
      <n-flex align="center">
        <n-icon size="24">
          <component :is="icons.welcome" style="transform: scaleX(-1)" />
        </n-icon>
        <n-text strong>{{ t('title.welcome') }}</n-text>
      </n-flex>
    </template>
    <n-p style="line-height: 1.8; font-size: 15px;">
      {{ t('desc.about') }}
    </n-p>
    <n-divider />
    <n-flex justify="start" align="center">
      <n-button @click="gotoGithub">
        <n-icon :component="LogoGithub" />
      </n-button>
      <n-button @click="gotoQQGroup">
        <n-icon :component="Qq"></n-icon>
      </n-button>
      discord: catizard_; email: Salieri_XY@163.com
    </n-flex>
  </n-card>
</template>

<script setup lang="tsx">
import { useI18n } from 'vue-i18n';
import { icons } from "@/utils/icons";
import { LogoGithub } from '@vicons/ionicons5';
import { Qq } from '@vicons/fa';

const { t } = useI18n();

function gotoGithub() {
  window.open("https://github.com/Catizard/Ginger-Tracker", "_blank");
}

function gotoQQGroup() {
  window.open("https://qm.qq.com/q/dSViX6GCpG", "_blank");
}
</script>

<style scoped>
.about-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}
</style>
