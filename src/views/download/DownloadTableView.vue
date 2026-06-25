<template>
  <n-card class="table-detail-card" :bordered="false">
    <n-space style="margin-bottom: 20px;" align="center">
      <n-button round @click="router.back()">
        <template #icon>
          <n-icon>
            <ArrowBackOutline />
          </n-icon>
        </template>
        {{ t('button.back') }}
      </n-button>
      <n-divider vertical />
      <n-text strong style="font-size: 18px;">{{ currentTableName }}</n-text>
    </n-space>

    <n-collapse v-model:expanded-names="expandedLevels" class="styled-collapse">
      <n-collapse-item v-for="entry in levelEntries" :key="entry.level" :name="entry.level"
        :title="tableLevelTitle(entry)">
        <TableDetail :table-id="tableID" :level="entry.level" />
      </n-collapse-item>
    </n-collapse>
  </n-card>
</template>

<script setup lang="tsx">
import { NButton, NIcon, NText } from 'naive-ui';
import { type TableLevelEntry, selectLevelEntries, selectOneHeader } from '@/api/table';
import { ref, type Ref, watch } from 'vue';
import { ArrowBackOutline } from '@vicons/ionicons5';
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';
import router from '@/router';
import TableDetail from './TableDetail.vue';

const { t } = useI18n();
const route = useRoute();
const tableID: Ref<number | null> = ref(null);

const currentTableName = ref('');
const currentTableSymbol = ref('');
const levelEntries: Ref<TableLevelEntry[]> = ref([]);
const expandedLevels = ref<string[]>([]);

async function loadData(id: number) {
  try {
    tableID.value = id;
    const { name, symbol } = await selectOneHeader(id);
    const levelEntriesRet = await selectLevelEntries(id);

    currentTableName.value = name;
    currentTableSymbol.value = symbol;
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
  if (currentTableSymbol.value != "") {
    return currentTableSymbol.value + entry.level;
  }
  return entry.level;
}

watch(() => route.params.id, (newValue) => {
  if (typeof newValue === "string") {
    loadData(Number.parseInt(newValue));
  } else {
    throw "No id passed"
  }
}, { immediate: true })

</script>

<style scoped>
.table-detail-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}

.styled-collapse {
  border-radius: 8px;
  overflow: hidden;
}

/* :deep(.n-collapse-item) { */
/*   border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06)); */
/*   margin-bottom: 12px; */
/*   border-radius: 8px !important; */
/*   overflow: hidden; */
/* } */

:deep(.n-collapse-item:last-child) {
  margin-bottom: 0;
}

/* :deep(.n-collapse .n-collapse-item .n-collapse-item__header) { */
/*   padding: 0px; */
/* } */

:deep(.n-collapse-item__header) {
  background: var(--n-color-modal, #fafafa);
}

/* :deep(.n-collapse-item__content__wrapper) { */
/*   padding: 16px; */
/* } */

/* :deep(.n-data-table-wrapper) { */
/*   border-radius: 8px; */
/* } */
</style>
