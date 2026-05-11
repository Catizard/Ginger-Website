<template>
  <n-card class="table-detail-card" :bordered="false">
    <n-space style="margin-bottom: 20px;" align="center">
      <n-button round @click="router.back()">
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
        <n-data-table remote :loading="loading" :columns="columns" :data="tableData" :pagination="pagination"
          :row-key="(row: TableData) => row.id" class="styled-table" />
      </n-collapse-item>
    </n-collapse>
  </n-card>
</template>

<script setup lang="tsx">
import { NButton, NIcon, NText } from 'naive-ui';
import { selectDataList, type TableLevelEntry, type TableData, selectLevelEntries, type DownloadableTableDataDto } from '@/api/table';
import type { DataTableColumns } from 'naive-ui';
import { reactive, ref, type Ref, type VNode, watch, computed } from 'vue';
import { DownloadOutline as DownloadIcon, ArrowBackOutline } from '@vicons/ionicons5';
import { useI18n } from '@/i18n';
import { useRoute } from 'vue-router';
import router from '@/router';
import { humanFileSize } from '@/utils/format';

const { t } = useI18n();
const route = useRoute();
const tableID: Ref<string | null> = ref(null);

const currentTableName = ref('');
const levelEntries: Ref<TableLevelEntry[]> = ref([]);
const expandedLevels = ref<string[]>([]);

const loading = ref(false);
const tableData: Ref<DownloadableTableDataDto[]> = ref([]);
const currentLevel = ref('');

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

const columns = computed<DataTableColumns<DownloadableTableDataDto>>(() => [
  {
    title: t.value('title'), key: "title",
    render(row): VNode {
      return row.title as any as VNode;
    }
  },
  { title: t.value('artist'), key: "artist" },
  {
    title: t.value('size'), key: "fileSize",
    render(row) {
      return humanFileSize(row.fileSize)
    }
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

function loadLevelEntries() {
  if (tableID.value == null) return;
  selectLevelEntries(Number.parseInt(tableID.value))
    .then(result => {
      if (result != null) {
        levelEntries.value = [...result];
        if (result.length > 0) {
          const first = result[0]!.level;
          expandedLevels.value = [first];
          currentLevel.value = first;
          loadTableData();
        }
      }
    });
}

function loadTableData() {
  if (tableID.value == null || !currentLevel) return;
  loading.value = true;
  selectDataList({
    headerID: Number.parseInt(tableID.value),
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

watch(expandedLevels, (newVal) => {
  if (newVal.length > 0 && newVal[0] != null) {
    currentLevel.value = newVal[0];
    pagination.page = 1;
    loadTableData();
  }
});

watch(() => route.params.id, (newValue) => {
  if (typeof newValue === "string") {
    tableID.value = newValue;
    loadLevelEntries();
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
