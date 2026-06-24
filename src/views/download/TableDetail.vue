<!-- Render a table component of a level folder from a difficult table -->
<template>
  <n-data-table remote :loading="loading" :columns="columns" :pagination="pagination" :data="data"
    :row-key="(row: TableData) => row.id" class="styled-table" />
</template>

<script lang="tsx" setup>
import { reactive, ref, watch, type Ref, type VNode } from 'vue';
import { NDataTable, type DataTableColumns, NButton, NIcon } from 'naive-ui';
import { selectDataList, type DownloadableTableDataDto, type TableData } from '@/api/table';
import { useI18n } from 'vue-i18n';
import { humanFileSize } from '@/utils/format';
import { DownloadOutline as DownloadIcon } from "@vicons/ionicons5";
import SongTitleParagraph from '@/components/SongTitleParagraph.vue';

const { t } = useI18n();

const props = defineProps<{
  tableId: number | null,
  level: string | null,
}>();

const loading = ref(false);

const data: Ref<DownloadableTableDataDto[]> = ref([]);
const columns: DataTableColumns<DownloadableTableDataDto> = [
  {
    title: t('title'), key: "title",
    render: (row: DownloadableTableDataDto): VNode => {
      return (
        <SongTitleParagraph lost={!row.downloadURL} data={row} />
      )
    }
  },
  {
    title: t('size'), key: "fileSize",
    render(row) {
      return humanFileSize(row.fileSize)
    }
  },
  {
    title: t('actions'), key: "actions",
    render(row): VNode | null {
      if (!row.downloadURL) {
        return null;
      }
      return (
        <NButton type="info" round size="small" onClick={() => window.open(row.downloadURL, '_blank')}>
          <NIcon>
            <DownloadIcon />
          </NIcon>
          {t('downloadBtn')}
        </NButton>
      )
    }
  }
];

const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page: number) => {
    pagination.page = page;
    loadData();
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    loadData();
  }
});


function loadData() {
  if (props.level == null || props.tableId == null) {
    return;
  }
  loading.value = true;
  selectDataList({
    level: props.level,
    headerID: props.tableId,
    pageRequest: pagination
  }).then(result => {
    console.log(result);
    if (result.data != null) {
      data.value = [...result.data];
      pagination.page = result.page;
      pagination.pageCount = result.pageCount;
      pagination.pageSize = result.pageSize;
    }
  }).catch(err => {
    console.error(err)
  }).finally(() => loading.value = false);
}

watch(() => props, () => {
  loadData()
}, { immediate: true });

</script>

<style scoped>
:deep(.styled-table .n-data-table-th) {
  font-weight: 600;
}

:deep(.styled-table .n-data-table-td) {
  padding: 12px 16px;
}
</style>
