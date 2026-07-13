<!-- Manage the tables on ginger rush -->
<template>
  <TitleWithButtons :title="t('title.admin.tableManage')">
    <n-button @click="handleClickImport" type="primary">
      {{ t('button.import') }}
    </n-button>
  </TitleWithButtons>
  <n-data-table :data="data" :columns="columns" :pagination="pagination" />
  <BindTableCategoryForm ref="bindTableCategoryFormRef" @submit="loadData" />
  <BindTableTagForm ref="bindTableTagFormRef" @submit="loadData" />
  <EditTableHeaderForm ref="editTableHeaderFormRef" @submit="loadData" />
</template>

<script setup lang="tsx">
import { deleteTable, selectHeaderListWithFullInfo, switchTableFlags, type TableHeader } from '@/api/table';
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { createPagination } from '@/utils/page';
import { NInput, NDataTable, useModal, type DataTableColumns, NTag, NFlex, NButton, NIcon, useDialog } from 'naive-ui';
import { ref, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import { importTableFromURL, recalculateTableCoverage } from '@/api/admin';
import { withinCoverage } from '@/utils/format';
import BindTableTagForm from './components/BindTableTagForm.vue';
import { icons } from "@/utils/icons";
import EditTableHeaderForm from './components/EditTableHeaderForm.vue';
import BindTableCategoryForm from './components/BindTableCategoryForm.vue';

const { t } = useI18n();
const modal = useModal();
const dialog = useDialog();

const bindTableCategoryFormRef: Ref<InstanceType<typeof BindTableCategoryForm> | null> = ref(null);
const bindTableTagFormRef: Ref<InstanceType<typeof BindTableTagForm> | null> = ref(null);
const editTableHeaderFormRef: Ref<InstanceType<typeof EditTableHeaderForm> | null> = ref(null);

const importTableURL = ref('');
function handleClickImport() {
  modal.create({
    title: t('title.importTableFromURL'),
    preset: "dialog",
    content: (): VNode => {
      return (
        <NInput value={importTableURL.value} onUpdateValue={nv => importTableURL.value = nv} />
      );
    },
    negativeText: t('button.cancel'),
    positiveText: t('button.submit'),
    onPositiveClick: async () => {
      await importTableFromURL(importTableURL.value);
      window.$notifyInfo(t('dialog.importTable.success'));
      loadData();
    }
  });
}

const loading = ref(false);
const data: Ref<TableHeader[]> = ref([]);
async function loadData() {
  loading.value = true;
  try {
    const headers = await selectHeaderListWithFullInfo({});
    if (headers.length > 0) {
      data.value = [...headers];
    }
  } finally {
    loading.value = false;
  }
}
const columns: DataTableColumns<TableHeader> = [
  {
    title: t('columns.name'), key: "name",
    render(row: TableHeader): VNode {
      return (
        <NFlex>
          {row.name}
          <NButton type="info" size='tiny' onClick={() => handleClickEditTable(row.id)}>
            <NIcon component={icons.edit} />
          </NButton>
        </NFlex>
      )
    }
  },
  { title: t('columns.symbol'), key: "symbol" },
  { title: t('columns.missingCount'), key: "missingCount" },
  {
    title: t('columns.dataCount'), key: "dataCount",
    render(row: TableHeader): VNode {
      return (
        <NFlex align='center'>
          {row.dataCount}({withinCoverage(row.dataCount, row.missingCount)})
          <NButton type="info" size='tiny' onClick={() => handleClickRefreshCoverage(row.id)}>
            <NIcon component={icons.refresh} />
          </NButton>
        </NFlex>
      )
    }
  },
  {
    title: t('columns.type'), key: "type",
    render(row: TableHeader): VNode {
      let type = "", value = "";
      switch (row.type) {
        case "TABLE": type = "success"; value = t('misc.table.table'); break;
        case "EVENT": type = "info"; value = t('misc.table.event'); break;
        default: throw "Unexpected table header's type: " + row.type;
      }

      return (
        <NFlex align='center'>
          <NTag type={type as any}>
            {value}
          </NTag>
          <NButton type="info" size='tiny' onClick={() => handleClickSwitchTableType(row.id)}>
            <NIcon component={icons.switch} />
          </NButton>
        </NFlex>
      )
    }
  },
  {
    title: t('columns.selfHost'), key: "selfHostFlag",
    render(row: TableHeader): VNode {
      let type = "", value = "";
      switch (row.selfhostFlag) {
        case true: type = "success"; value = t('misc.table.selfHost'); break;
        case false: type = "info"; value = t('misc.table.external'); break;
        default: throw "Unexpected table header's type: " + row.type;
      }

      return (
        <NFlex align='center'>
          <NTag type={type as any}>
            {value}
          </NTag>
          <NButton type="info" size='tiny' onClick={() => handleClickSwitchTableSelfHostFlag(row.id)}>
            <NIcon component={icons.switch} />
          </NButton>
        </NFlex>
      )
    }
  },
  {
    title: t('columns.category'), key: "categoryName",
    render(row: TableHeader): VNode {
      return (
        <NFlex align="center">
          {row.categoryID == -1 ? "NULL" : row.categoryName}
          <NButton type="info" size='tiny' onClick={() => handleClickEditCategory(row.id, row.categoryID)}>
            <NIcon component={icons.edit} />
          </NButton>
        </NFlex>
      )
    }
  },
  {
    title: t('columns.tag'), key: "tag",
    render(row: TableHeader): VNode {
      return (
        <NFlex align='center'>
          {
            row.tagID == -1 ? <>NULL</>
              :
              <NTag color={{ color: row.tagColor, textColor: row.tagTextColor }}>
                {row.tagName}
              </NTag>
          }
          <NButton type="info" size="tiny" onClick={() => handleClickEditTag(row.id, row.tagID)}>
            <NIcon component={icons.edit} />
          </NButton>
        </NFlex>
      );
    }
  },
  {
    title: t('columns.actions'), key: "actions",
    render(row: TableHeader): VNode {
      return (
        <NButton type="error" size='medium' onClick={() => handleClickDeleteTable(row.id)}>
          {t('button.delete')}
        </NButton>
      )
    }
  },
];
const pagination = createPagination();

function handleClickRefreshCoverage(id: number) {
  dialog.create({
    title: t('title.admin.refreshTableCoverage'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: () => {
      recalculateTableCoverage(id);
      window.$notifyInfo(t('dialog.requestSent'));
    }
  });
}

function handleClickEditTag(headerID: number, tagID: number) {
  bindTableTagFormRef.value?.open(headerID, tagID);
}

function handleClickEditCategory(headerID: number, categoryID: number) {
  bindTableCategoryFormRef.value?.open(headerID, categoryID);
}

function handleClickDeleteTable(headerID: number) {
  let loading = false;
  dialog.create({
    loading: loading,
    title: t('title.admin.deleteTable'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      loading = true;
      try {
        deleteTable(headerID);
      } finally {
        loading = false;
      }
    }
  })
}

function handleClickEditTable(headerID: number) {
  editTableHeaderFormRef.value?.open(headerID);
}

function handleClickSwitchTableType(headerID: number) {
  let loading = false;
  dialog.create({
    loading: loading,
    title: t('title.admin.switchTableType'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      loading = true;
      try {
        await switchTableFlags({
          id: headerID,
          type: true,
        });
      } finally {
        loading = false;
      }
    }
  });
}

function handleClickSwitchTableSelfHostFlag(headerID: number) {
  let loading = false;
  dialog.create({
    loading: loading,
    title: t('title.admin.switchTableSelfHostFlag'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      loading = true;
      try {
        await switchTableFlags({
          id: headerID,
          selfhostFlag: true,
        });
      } finally {
        loading = false;
      }
    }
  });
}

loadData();
</script>
