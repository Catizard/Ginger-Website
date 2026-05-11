<template>
  <div v-if="!selectedTableId">
    <n-grid :cols="2" :x-gap="20" :y-gap="20">
      <n-grid-item v-for="table in filteredTableList" :key="table.id">
        <n-card hoverable :title="table.name" @click="selectTable(table.id)" class="table-card" :bordered="false">
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
  </div>

  <div v-else>
    <n-card class="table-detail-card" :bordered="false">
      <n-space style="margin-bottom: 20px;" align="center">
        <n-button round @click="selectedTableId = null">
          <template #icon>
            <n-icon>
              <ArrowBackOutline />
            </n-icon>
          </template>
          {{ t('back') }}
        </n-button>
        <n-divider vertical />
        <n-text strong style="font-size: 18px;">{{ currentTableName }}</n-text>
      </n-space>

      <n-collapse v-model:expanded-names="expandedLevels" class="styled-collapse">
        <n-collapse-item v-for="entry in levelEntries" :key="entry.level" :name="entry.level" :title="entry.level">
          <n-data-table remote :loading="loading" :columns="columns" :data="filteredTableData" :pagination="pagination"
            :row-key="(row: TableData) => row.id" class="styled-table" />
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { NButton, NIcon, NTag, NText } from 'naive-ui';
import { selectHeaderList, selectLevelEntries, selectDataList, type TableHeader, type TableLevelEntry, type TableData } from '@/api/table';
import type { DataTableColumns } from 'naive-ui';
import { reactive, ref, type Ref, type VNode, watch, computed, onMounted, onUnmounted } from 'vue';
import { DownloadOutline as DownloadIcon, ArrowBackOutline, ListOutline, MusicalNotesOutline } from '@vicons/ionicons5';
import { useI18n } from '@/i18n';

const { t } = useI18n();

const tableList: Ref<TableHeader[]> = ref([]);
const selectedTableId = ref<number | null>(null);
const currentTableName = ref('');
const levelEntries: Ref<TableLevelEntry[]> = ref([]);
const expandedLevels = ref<string[]>([]);

const loading = ref(false);
const tableData: Ref<TableData[]> = ref([]);
const currentLevel = ref('');
const searchQuery = ref('');

const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page: number) => {
    pagination.page = page;
    loadTableData();
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    loadTableData();
  }
});

const columns = computed<DataTableColumns<TableData>>(() => [
  {
    title: t.value('title'), key: "title",
    render(row): VNode {
      return row.title as any as VNode;
    }
  },
  {
    title: t.value('artist'), key: "artist"
  },
  {
    title: t.value('level'), key: "level"
  },
  {
    title: t.value('actions'), key: "actions",
    render(row): VNode | null {
      if (!row.url) {
        return null;
      }
      return (
        <NButton type="info" round size="small" onClick={() => window.open(row.url, '_blank')}>
          <NIcon>
            <DownloadIcon />
          </NIcon>
          {t.value('downloadBtn')}
        </NButton>
      )
    }
  }
]);

const filteredTableList = computed(() => {
  if (!searchQuery.value) return tableList.value;
  const query = searchQuery.value.toLowerCase();
  return tableList.value.filter(t =>
    t.name.toLowerCase().includes(query) ||
    t.levelOrders.toLowerCase().includes(query)
  );
});

const filteredTableData = computed(() => {
  if (!searchQuery.value) return tableData.value;
  const query = searchQuery.value.toLowerCase();
  return tableData.value.filter(row =>
    (row.title && row.title.toLowerCase().includes(query)) ||
    (row.artist && row.artist.toLowerCase().includes(query)) ||
    (row.level && row.level.toLowerCase().includes(query))
  );
});

function loadTableList() {
  selectHeaderList({}).then(result => {
    tableList.value = [...result];
  });
}

function selectTable(id: number) {
  selectedTableId.value = id;
  const table = tableList.value.find(t => t.id === id);
  if (table) {
    currentTableName.value = table.name;
  }
  loadLevelEntries(id);
}

function loadLevelEntries(id: number) {
  selectLevelEntries(id).then(result => {
    levelEntries.value = [...result];
    if (result.length > 0) {
      const firstLevel = result[0]!.level;
      expandedLevels.value = [firstLevel];
      currentLevel.value = firstLevel;
      loadTableData();
    }
  });
}

function loadTableData() {
  if (selectedTableId.value == null || !currentLevel.value) return;
  loading.value = true;
  selectDataList({
    headerID: selectedTableId.value,
    level: currentLevel.value,
    pageRequest: {
      page: pagination.page,
      pageSize: pagination.pageSize
    },
  }).then(result => {
    if (result.data != null) {
      tableData.value = [...result.data];
      pagination.pageCount = result.pageCount;
    }
  }).finally(() => loading.value = false);
}

function handleSearch(event: Event) {
  searchQuery.value = (event as CustomEvent).detail;
}

onMounted(() => {
  loadTableList();
  window.addEventListener('search-update', handleSearch);
});

onUnmounted(() => {
  window.removeEventListener('search-update', handleSearch);
});

watch(expandedLevels, (newVal) => {
  if (newVal.length > 0 && newVal[0] != null) {
    currentLevel.value = newVal[0];
    pagination.page = 1;
    loadTableData();
  }
});

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

.table-detail-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}

.styled-collapse {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.n-collapse-item) {
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
  margin-bottom: 12px;
  border-radius: 8px !important;
  overflow: hidden;
}

:deep(.n-collapse-item:last-child) {
  margin-bottom: 0;
}

:deep(.n-collapse .n-collapse-item .n-collapse-item__header) {
  padding: 0px;
}

:deep(.n-collapse-item__header) {
  background: var(--n-color-modal, #fafafa);
}

:deep(.n-collapse-item__content__wrapper) {
  padding: 16px;
}

:deep(.styled-table .n-data-table-th) {
  font-weight: 600;
}

:deep(.styled-table .n-data-table-td) {
  padding: 12px 16px;
}

:deep(.n-data-table-wrapper) {
  border-radius: 8px;
}
</style>
