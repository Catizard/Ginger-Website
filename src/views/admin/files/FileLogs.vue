<!-- Render the logs of updating or deleting files on the server -->
<template>
  <TitleWithButtons :title="t('title.admin.fileLogs')" />
  <n-data-table remote :loading="loading" :data="data" :pagination="pagination" :columns="columns" />
</template>

<script setup lang="tsx">
import { selectFileLogs, type FileLog } from '@/api/files';
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { humanFileSize } from '@/utils/format';
import { createPagination } from '@/utils/page';
import { NText, type DataTableColumns, type PaginationProps } from 'naive-ui';
import { ref, type Reactive, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const loading = ref(false);
const data: Ref<FileLog[]> = ref([]);
const pagination: Reactive<PaginationProps> = createPagination(loadData);
const columns: DataTableColumns<FileLog> = [
  {
    title: t('columns.time'), key: "createTime",
  },
  {
    title: t('columns.type'), key: "type",
  },
  {
    title: t('columns.size'), key: "fileSize",
    render(row: FileLog): VNode {
      return (
        <NText>
          {humanFileSize(row.fileSize)}
        </NText>
      )
    }
  },
  { title: t('columns.name'), key: "fileName", }
];

async function loadData() {
  loading.value = true;
  try {
    const logs = await selectFileLogs({
      pageRequest: {
        page: pagination.page!!,
        pageSize: pagination.pageSize!!
      },
    });
    if (logs.data != null) {
      pagination.pageCount = logs.pageCount;
      data.value = [...logs.data];
    }
  } finally {
    loading.value = false;
  }
}

loadData();
</script>
