<template>
  <n-card class="coming-soon-card" :bordered="false">
    <n-result
      status="404"
      :title="t('comingSoon')"
      :description="t('comingSoonDesc')"
      size="large"
    />
  </n-card>
</template>

<script setup lang="ts">
import { useI18n } from '@/i18n';

const { t } = useI18n();
</script>

<style scoped>
.coming-soon-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}
</style>
