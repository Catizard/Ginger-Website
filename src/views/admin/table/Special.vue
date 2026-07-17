<!-- Manage the special tables on gingerrush -->
<template>
  <TitleWithButtons :title="t('title.admin.specialTablesManage')">
    <n-button type="primary" @click="handleClickNewSpecialTable">
      {{ t('button.new') }}
    </n-button>
  </TitleWithButtons>
  <n-data-table :data="data" :columns="columns" :pagination="pagination" />
  <NewSpecialTableForm ref="newSpecialTableFormRef" @submit="loadData" />
</template>

<script setup lang="tsx">
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { createPagination } from '@/utils/page';
import { NDataTable, type DataTableColumns, NTag, NButton, useDialog } from 'naive-ui';
import { ref, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import NewSpecialTableForm from './components/NewSpecialTableForm.vue';
import { deleteSpecialTableByID, selectSpecialTableListWithFullInfo, type SpecialTableDto } from '@/api/specialTable';
import type { TableHeader } from '@/api/table';

const { t } = useI18n();
const dialog = useDialog();

const newSpecialTableFormRef: Ref<InstanceType<typeof NewSpecialTableForm> | null> = ref(null);

const loading = ref(false);
const data: Ref<TableHeader[]> = ref([]);
async function loadData() {
  loading.value = true;
  try {
    const headers = await selectSpecialTableListWithFullInfo({});
    if (headers.length > 0) {
      data.value = [...headers];
    }
  } finally {
    loading.value = false;
  }
}

const columns: DataTableColumns<SpecialTableDto> = [
  { title: t('columns.name'), key: "tableName", },
  {
    title: t('columns.type'), key: "tableType",
    render(row: SpecialTableDto): VNode {
      let type = "", value = "";
      switch (row.tableType) {
        case "TABLE": type = "success"; value = t('misc.table.table'); break;
        case "EVENT": type = "info"; value = t('misc.table.event'); break;
        default: throw "Unexpected table header's type: " + row.tableType;
      }

      return (
        <NTag type={type as any}>
          {value}
        </NTag>
      )
    }
  },
  {
    title: t('columns.actions'), key: "actions",
    render(row: SpecialTableDto): VNode {
      return (
        <NButton type="error" size='medium' onClick={() => handleClickDeleteSpecialTable(row.id)}>
          {t('button.delete')}
        </NButton>
      )
    }
  },
];

const pagination = createPagination();

function handleClickDeleteSpecialTable(id: number) {
  let loading = false;
  dialog.create({
    loading: loading,
    title: t('title.admin.deleteSpecialTable'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      loading = true;
      try {
        deleteSpecialTableByID(id);
      } finally {
        loading = false;
      }
    }
  })
}

function handleClickNewSpecialTable() {
  newSpecialTableFormRef.value?.open();
}

loadData();
</script>
