<template>
  <SelectTable v-model:value="currentTableId" />
  <n-data-table remote :loading="loading" :columns="columns" :data="data" :pagination="false"
    :row-key="(row: TableLevelEntry) => row.level" />
</template>

<script setup lang="tsx">
import { selectLevelEntries, type TableLevelEntry } from '@/api/table';
import type { DataTableColumns } from 'naive-ui';
import { ref, watch, type Ref, type VNode } from 'vue';
import SelectTable from './SelectTable.vue';
import TableData from './TableData.vue';

const loading = ref(false);

const currentTableId: Ref<number | null> = ref(null);

let data: Ref<TableLevelEntry[]> = ref([]);
const columns: DataTableColumns<TableLevelEntry> = [
  {
    type: "expand",
    renderExpand(row: TableLevelEntry): VNode {
      return (
        <TableData headerId={currentTableId.value ?? 0} level={row.level} />
      )
    }
  },
  { title: "Name", key: "name" }
];

function loadData() {
  loading.value = true;
  selectLevelEntries(currentTableId.value ?? 0).then(result => {
    data.value = [...result];
  }).finally(() => loading.value = false);
}

watch(currentTableId, () => {
  loadData();
})
</script>
