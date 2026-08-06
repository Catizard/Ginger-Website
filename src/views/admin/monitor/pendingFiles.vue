<!-- Show the pending files on the server -->
<template>
  <TitleWithButtons :title="t('title.pendingFiles')" />
  <n-data-table remote :loading="loading" :data="data" :columns="columns" :pagination="pagination" />
</template>

<script setup lang="tsx">
import { NButton, useDialog, type DataTableColumns, NTime } from 'naive-ui';
import { ref, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import { createPagination } from '@/utils/page';
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { cancelPending, selectPendingFilesList, type FilePending } from "@/api/files";

const { t } = useI18n();
const dialog = useDialog();

const loading = ref(false);
const data: Ref<FilePending[]> = ref([]);
const columns: DataTableColumns<FilePending> = [
  { title: t('columns.type'), key: "type" },
  { title: t('columns.name'), key: "fileName" },
  { title: t('columns.status'), key: "status" },
  {
    title: t('columns.time'), key: "createTime",
    render(row: FilePending): VNode {
      return (
        <NTime unix time={row.createTime} />
      )
    }
  },
  {
    title: t('columns.actions'), key: "actions",
    render: (row: FilePending): VNode | null => {
      if (row.status != "AWAIT") {
        return null;
      }

      return (
        <NButton type="error" onClick={() => handleClickCancelPending(row.id)}>
          {t('button.cancel')}
        </NButton>
      );
    }
  }
];
const pagination = createPagination(loadData);

function loadData() {
  loading.value = true;
  selectPendingFilesList({
    pageRequest: {
      page: pagination.page!!,
      pageSize: pagination.pageSize!!
    }
  }).then(result => {
    if (result.data != null) {
      pagination.pageCount = result.pageCount;
      data.value = [...result.data];
    }
  }).finally(() => loading.value = false);
}

function handleClickCancelPending(id: number) {
  let loading = false;
  dialog.create({
    loading: loading,
    title: t('title.admin.cancelPending'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      loading = true;
      try {
        await cancelPending(id);
        loadData();
      } finally {
        loading = false;
      }
    }
  });
}

loadData();
</script>
