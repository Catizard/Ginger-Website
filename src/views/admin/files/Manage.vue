<!-- Manage the files on the server, you can also view this component as the internal version of FileDataTable -->
<template>
  <TitleWithButtons :title="t('title.admin.filesManage')"></TitleWithButtons>
  <n-data-table remote :loading="loading" :columns="columns" :data="data" :pagination="pagination"
    :row-key="(row: FileEntryDto) => row.downloadURL" @update:sorter="handleUpdateSorter" />
</template>

<script setup lang="tsx">
import { findFileEntries, fullDeleteFile, type FileEntryDto, type QueryFileEntryVo } from '@/api/files';
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { NButton, NTime, useDialog, type DataTableColumns, type DataTableSortState } from 'naive-ui';
import { ref, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import SongDataTable from '@/views/main/download/components/SongDataTable.vue';
import { humanFileSize } from '@/utils/format';
import { createPagination } from '@/utils/page';
import { Convert, type Sorter } from '@/api/sorter';

const { t } = useI18n();
const dialog = useDialog();

const loading: Ref<boolean> = ref(false);
let data: Ref<Array<FileEntryDto>> = ref([]);
const pagination = createPagination(loadData);
const sorter: Ref<Sorter> = ref({});
const columns: DataTableColumns<FileEntryDto> = [
  {
    type: "expand",
    renderExpand(row: FileEntryDto): VNode {
      return (
        <SongDataTable entryID={row.id} />
      )
    }
  },
  { title: t('columns.name'), key: "fileName" },
  {
    title: t('columns.size'), key: "fileSize", sorter: true,
    render(row) {
      return humanFileSize(row.fileSize);
    }
  },
  {
    title: t('columns.time'), key: "createTime",
    render(row: FileEntryDto): VNode {
      return (
        <NTime time={row.createTime} unix />
      )
    }
  },
  {
    title: t('columns.actions'), key: "actions",
    render(row: FileEntryDto): VNode {
      return (
        <NButton type="error" onClick={() => handleClickDeleteFile(row.id)}>
          {t('button.delete')}
        </NButton>
      )
    }
  }
];

function loadData() {
  let query: QueryFileEntryVo = {
    pageRequest: {
      page: pagination.page!!,
      pageSize: pagination.pageSize!!
    },
    orderBy: sorter.value.orderBy,
    orderDirection: sorter.value.orderDirection,
  };

  console.log('query: ', query);

  findFileEntries(query)
    .then(result => {
      if (result.data != null) {
        pagination.pageCount = result.pageCount;
        data.value = [...result.data];
      }
    }).finally(() => { loading.value = false });
}

function handleClickDeleteFile(id: number) {
  let loading = false;
  dialog.create({
    loading: loading,
    title: t('title.admin.fullDeleteFile'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      loading = true;
      try {
        await fullDeleteFile(id);
        loadData();
      } finally {
        loading = false;
      }
    }
  });
}

function handleUpdateSorter(option: DataTableSortState) {
  sorter.value = Convert(option);
  loadData();
}

loadData();
</script>
