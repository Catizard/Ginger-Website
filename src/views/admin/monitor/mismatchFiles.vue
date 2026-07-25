<!-- Show the mismatch files on the server -->
<template>
  <TitleWithButtons :title="t('title.mismatchFiles')">
    <n-button type="primary" @click="handleClickAuditFiles">
      {{ t('button.auditFiles') }}
    </n-button>
  </TitleWithButtons>
  <n-data-table remote :loading="loading" :data="data" :columns="columns" :pagination="pagination" />
</template>

<script setup lang="tsx">
import { useDialog, type DataTableColumns } from 'naive-ui';
import { ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { createPagination } from '@/utils/page';
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { selectMismatchFilesList, type FileMismatch } from '@/api/mismatchFiles';
import { auditFiles } from "@/api/files";

const { t } = useI18n();
const dialog = useDialog();

const loading = ref(false);
const data: Ref<FileMismatch[]> = ref([]);
const columns: DataTableColumns<FileMismatch> = [
];
const pagination = createPagination(loadData);

function loadData() {
  loading.value = true;
  selectMismatchFilesList({
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

function handleClickAuditFiles() {
  let loading = false;
  dialog.create({
    loading: loading,
    title: t('title.admin.auditFiles'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      loading = true;
      try {
        await auditFiles();
        loadData();
      } finally {
        loading = false;
      }
    }
  });
}

loadData();
</script>
