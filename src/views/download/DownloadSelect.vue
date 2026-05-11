<template>
  <n-grid :cols="2" :x-gap="20" :y-gap="20">
    <n-grid-item v-for="table in tableList" :key="table.id">
      <n-card hoverable :title="table.name" @click="handleClickTable(table.id)" class="table-card" :bordered="false">
        <template #header-extra>
          <n-tag type="info" round size="small">
            {{ ((table.dataCount - table.missingCount) / table.dataCount * 100).toFixed(1) }}%
          </n-tag>
        </template>
        <n-space vertical :size="8">
          <n-space align="center">
            <n-icon :component="ListOutline" size="16" color="var(--n-text-color-3)" />
            <n-text depth="3" style="font-size: 13px;">{{ t('difficultyLevel') }}: {{ table.levelOrders }}</n-text>
          </n-space>
          <n-space align="center">
            <n-icon :component="MusicalNotesOutline" size="16" color="var(--n-text-color-3)" />
            <n-text depth="3" style="font-size: 13px;">{{ t('trackCount') }}: {{ table.dataCount }}</n-text>
          </n-space>
        </n-space>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { selectHeaderList, type TableHeader, type TableType } from "@/api/table";
import { useI18n } from "@/i18n";
import router from "@/router";
import { ListOutline, MusicalNotesOutline } from "@vicons/ionicons5"
import { ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";

const { t } = useI18n();
const route = useRoute();

const tableList: Ref<TableHeader[]> = ref([]);

function loadTableList(queryType: TableType) {
  selectHeaderList({
    type: queryType
  }).then(result => {
    tableList.value = [...result];
  });
}

function handleClickTable(id: number) {
  router.push(`/download/table/${id}`);
}

watch(() => route.params.type, (queryType) => {
  if (queryType !== "TABLE" && queryType !== "EVENT") {
    console.error("Unexpected table query type: ", queryType);
    router.push("/404");
  }
  loadTableList(queryType as any);
}, { immediate: true });
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
