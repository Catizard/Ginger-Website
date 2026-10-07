<!-- Show the pending files on the server -->
<template>
  <TitleWithButtons :title="t('title.pendingFiles')">
    <n-button type="error" @click="handleClickAllAwaits">
      <template #icon>
        <n-icon :component="icons.delete" />
      </template>
      {{ t('button.deleteAllAwaitPendings') }}
    </n-button>
  </TitleWithButtons>
  <!-- Search Area -->
  <n-flex gap="8" vertical>
    <n-flex gap="8" horizontal :wrap="false">
      <n-input-group>
        <n-input v-model:value="fileNameLike" clearable :placeholder="t('placeholder.searchFuzzyFileName')" autofocus>
          <template #prefix>
            <n-icon :component="icons.search" />
          </template>
        </n-input>
        <n-select v-model:value="withinStatus" multiple :options="statusOptions" />
        <n-button type="primary" @click="clickSearch">
          {{ t('button.search') }}
        </n-button>
      </n-input-group>
    </n-flex>
  </n-flex>
  <n-data-table remote :loading="loading" :data="data" :columns="columns" :pagination="pagination" />
</template>

<script setup lang="tsx">
import { NButton, useDialog, type DataTableColumns, NTime, type SelectOption } from 'naive-ui';
import { ref, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import { createPagination } from '@/utils/page';
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { cancelPending, deleteAllAwaitPendings, FilePendingStatusValue, selectPendingFilesList, type FilePending } from "@/api/files";
import { icons } from "@/utils/icons";

const { t } = useI18n();
const dialog = useDialog();

// Search parameters
const fileNameLike = ref("");
const withinStatus = ref(["AWAIT"]);
const statusOptions = FilePendingStatusValue.map(sv => {
  return {
    label: sv,
    value: sv,
  } as SelectOption;
});

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
    },
    fileNameLike: fileNameLike.value,
    withinStatus: withinStatus.value,
  }).then(result => {
    if (result.data != null) {
      pagination.pageCount = result.pageCount;
      data.value = [...result.data];
    }
  }).finally(() => loading.value = false);
}

function handleClickCancelPending(id: number) {
  const d = dialog.create({
    loading: false,
    title: t('title.admin.cancelPending'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      d.loading = true;
      try {
        await cancelPending(id);
        loadData();
      } finally {
        d.loading = false;
      }
    }
  });
}
function handleClickAllAwaits() {
  const d = dialog.create({
    loading: false,
    title: t('title.admin.deleteAllAwaitPendings'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      d.loading = true;
      try {
        await deleteAllAwaitPendings();
        pagination.page = 1;
        loadData();
      } finally {
        d.loading = false;
      }
    }
  });
}

function clickSearch() {
  pagination.page = 1;
  loadData();
}

loadData();
</script>
