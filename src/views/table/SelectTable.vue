<template>
  <n-select :loading="loading" v-model:value="tableId" :options="tableOptions" />
</template>

<script setup lang="tsx">
import { selectHeaderList, type TableHeader } from '@/api/table';
import type { SelectOption } from 'naive-ui';
import { onMounted, ref, type Ref } from 'vue';


const loading = ref(false);
const tableId = defineModel<number | null>("value");
const tableOptions: Ref<SelectOption[]> = ref([]);

function loadTableOptions() {
  loading.value = true;
  selectHeaderList({}).then(result => {
    tableOptions.value = result.map((row: TableHeader) => {
      console.log(row);
      console.log(row.dataCount);
      console.log(row.missingCount);
      return {
        label: `${row.name}(coverage: ${((row.dataCount - row.missingCount) / row.dataCount * 100).toFixed(2)})`,
        value: row.id
      }
    });
    if (tableOptions.value.length > 0) {
      tableId.value = tableOptions.value[0]?.value as number;
    }
  }).finally(() => loading.value = false);
}

onMounted(() => {
  loadTableOptions();
});



</script>
