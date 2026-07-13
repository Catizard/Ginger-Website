<template>
  <n-space vertical :size="24">

    <n-card class="integrations-card" :borded="false">
      <n-h1>Endless Dream (After 0.4.0 unstable development version)</n-h1>
      <n-p>
        {{ t('desc.integrations.endlessdreamAfter0_4_0') }}
      </n-p>
      <img :src="endlessdreamAfter0_4_0" />
    </n-card>

    <n-card class="integrations-card" :borded="false">
      <n-h1>Endless Dream (0.3.0 and before)</n-h1>
      <n-p>
        {{ t('desc.integrations.endlessdream0_3_0AndBefore') }}
        <br>
        <pre>https://gingerrush.com/download/direct/%s</pre>
      </n-p>
      <img :src="endlessdream0_3_0AndBefore" />
    </n-card>

    <n-card class="integrations-card" :borded="false">
      <n-h1>Lampghost</n-h1>
      <n-p>
        {{ t('desc.integrations.lampghost') }}
        <a href="https://github.com/Catizard/lampghost/releases">Lampghost</a>
      </n-p>
    </n-card>

    <n-card class="integrations-card" :borded="false">
      <n-h1>Ginger Downloader</n-h1>
      <n-p>
        {{ t('desc.integrations.gingerdownloader') }}
        <a href="https://github.com/Catizard/Ginger-Downloader/releases">Ginger-Downloader</a>
      </n-p>
    </n-card>

  </n-space>
</template>

<script setup lang="ts">
import { NH1 } from 'naive-ui';
import endlessdreamAfter0_4_0 from "@images/integrations/endlessdream_after_0.4.0.png";
import endlessdream0_3_0AndBefore from "@images/integrations/endlessdream0_3_0AndBefore.png";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.integrations-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}

img {
  max-width: 100%;
  max-height: 500px;
  width: auto;
  height: auto;
}
</style>
