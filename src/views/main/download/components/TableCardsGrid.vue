<!-- A grid of cards, each card renders a table's basic info and can navigate by clicking -->
<template>
  <n-grid :cols="2" :x-gap="20" :y-gap="20">
    <n-grid-item v-for="table in tables" :key="table.id">
      <n-card hoverable :title="table.name" @click="handleClickTable(table.id)" class="table-card" :bordered="false">
        <template #header-extra>
          <n-flex vertical>
            <n-icon v-if="table.missingCount == 0 && table.dataCount != 0" :component="CheckmarkCircle" size="24"
              color="#0E7A0D" />
            <n-tag v-else type="info" round size="small">
              {{ withinCoverage(table.dataCount, table.missingCount) }}
            </n-tag>
            <n-button v-if="table.selfhostFlag" size="tiny" @click.stop="handleCopyTableURL(table.id)">
              Copy url
            </n-button>
          </n-flex>
        </template>
        <n-space vertical :size="8">
          <n-flex align="center">
            <!-- TODO: Fix the garbage data :( -->
            <!-- <n-icon :component="ListOutline" size="16" color="var(--n-text-color-3)" /> -->
            <!-- <n-text depth="3" style="font-size: 13px;">{{ t('difficultyLevel') }}: {{ table.levelOrders }}</n-text> -->
          </n-flex>
          <n-flex align="center">
            <n-icon :component="MusicalNotesOutline" size="16" color="var(--n-text-color-3)" />
            <n-text depth="3" style="font-size: 13px;">{{ t('misc.trackCount') }}: {{ table.dataCount }}</n-text>
          </n-flex>
        </n-space>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="tsx">
import type { TableHeader } from '@/api/table';
import { CheckmarkCircle, MusicalNotesOutline } from "@vicons/ionicons5"
import { withinCoverage } from '@/utils/format';
import { useI18n } from 'vue-i18n';
import router from "@/router";

const props = defineProps<{
  tables: TableHeader[],
}>();

const { t } = useI18n();
function handleClickTable(id: number) {
  router.push(`/download/table/${id}`);
}

function handleCopyTableURL(id: number) {
  const url = `https://gingerrush.com/api/v1/table/meta/header/${id}.json`
  navigator.clipboard.writeText(url);
}
</script>

<style scoped>
.table-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
  transition: all 0.2s ease;
  cursor: pointer;
}

.table-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
</style>
