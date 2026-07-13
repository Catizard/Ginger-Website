<!-- Render the levels of a difficult table -->
<template>
  <n-collapse v-model:expanded-names="expandedLevels" class="styled-collapse">
    <n-collapse-item v-for="entry in levelEntries" :key="entry.level" :name="entry.level"
      :title="tableLevelTitle(entry)">
      <SabunDataTable :tableID="tableID" :level="entry.level" />
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="tsx">
import { selectLevelEntries, type TableLevelEntry } from '@/api/table';
import { ref, watch, type Ref } from 'vue';
import SabunDataTable from './SabunDataTable.vue';

const props = defineProps<{
  tableID: number | null,
  tableName: string,
  tableSymbol: string
}>();

const expandedLevels = ref<string[]>([]);
const levelEntries: Ref<TableLevelEntry[]> = ref([]);

async function loadData() {
  try {
    console.log('tableid: ', props.tableID);
    const id = props.tableID!!;
    const levelEntriesRet = await selectLevelEntries(id);

    levelEntries.value = [...levelEntriesRet];
    if (levelEntriesRet.length > 0) {
      const first = levelEntriesRet[0]!.level;
      expandedLevels.value = [first];
    }
  } catch (ex) {
    console.error(ex);
  }
}
function tableLevelTitle(entry: TableLevelEntry): string {
  if (props.tableSymbol != "") {
    return props.tableSymbol + entry.level;
  }
  return entry.level;
}

watch(() => props.tableID, () => {
  loadData();
}, { immediate: true });
</script>
