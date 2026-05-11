<template>
  <n-card class="download-card" :bordered="false">
    <n-data-table remote :loading="loading" :columns="columns" :data="data" :pagination="pagination"
      :row-key="(row: FileEntryDto) => row.downloadURL" class="styled-table" />
  </n-card>
</template>

<script setup lang="tsx">
import { NButton, NIcon } from 'naive-ui';
import { findFileEntries, type FileEntryDto } from '@/api/files';
import type { DataTableColumns } from 'naive-ui';
import { reactive, ref, type Ref, type VNode, computed, onMounted, onUnmounted } from 'vue';
import { DownloadOutline as DownloadIcon } from '@vicons/ionicons5';
import { humanFileSize } from '@/utils/format';
import { useI18n } from '@/i18n';

const { t } = useI18n();

let loading = ref(false);
let data: Ref<Array<FileEntryDto>> = ref([]);
const fileNameLike = ref('');

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

const columns = computed<DataTableColumns<FileEntryDto>>(() => [
  { title: t.value('name'), key: "fileName" },
  {
    title: t.value('size'), key: "fileSize",
    render(row) {
      return humanFileSize(row.fileSize);
    }
  },
  {
    title: t.value('actions'), key: "actions",
    render(row): VNode {
      return (
        <NButton type="info" round size="small" onClick={() => window.open(row.downloadURL, '_blank')}>
          <NIcon>
            <DownloadIcon />
          </NIcon>
          {t.value('downloadBtn')}
        </NButton>
      )
    }
  }
]);

function loadData() {
  loading.value = true;
  findFileEntries({
    pageRequest: {
      page: pagination.page,
      pageSize: pagination.pageSize
    },
    fileNameLike: fileNameLike.value,
    md5: ""
  })
    .then(result => {
      if (result.data != null) {
        data.value = [...result.data];
        pagination.pageCount = result.pageCount;
      }
    }).finally(() => { loading.value = false });
}

function handleSearch(event: Event) {
  const detail = (event as CustomEvent).detail;
  fileNameLike.value = detail;
  pagination.page = 1;
  loadData();
}

onMounted(() => {
  loadData();
  window.addEventListener('search-update', handleSearch);
});

onUnmounted(() => {
  window.removeEventListener('search-update', handleSearch);
});
</script>

<style scoped>
.download-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
  overflow: hidden;
}

:deep(.styled-table .n-data-table-th) {
  font-weight: 600;
  color: var(--n-text-color-base);
}

:deep(.styled-table .n-data-table-td) {
  padding: 12px 16px;
}

:deep(.n-data-table-wrapper) {
  border-radius: 8px;
}

:deep(.n-pagination) {
  padding: 12px 0;
}
</style>
