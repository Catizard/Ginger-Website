<!-- Manages the table categories -->
<template>
  <TitleWithButtons :title="t('title.admin.categoryManage')">
    <n-button type="primary" @click="handleClickNewCategory">
      {{ t('button.newCategory') }}
    </n-button>
    <n-button type="info" @click="handleClickSortCategories">
      {{ t('button.sortCategories') }}
    </n-button>
  </TitleWithButtons>
  <n-data-table :loading="loading" :data="data" :pagination="pagination" :columns="columns" />
  <EditTableCategoryForm ref="editTableCategoryFormRef" @submit="loadData" />
  <NewTableCategoryForm ref="newTableCategoryFormRef" @submit="loadData" />
  <SortTableModal v-model:show="sortCategoriesSetting.show" :queryFunc="sortCategoriesSetting.queryFunc"
    @select="sortCategoriesSetting.handleUpdateSort" :title="sortCategoriesSetting.title"
    :labelField="sortCategoriesSetting.labelField" :keyField="sortCategoriesSetting.keyField" />
</template>

<script setup lang="tsx">
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { reactive, ref, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import { NButton, NDataTable, NFlex, NIcon, useDialog, type DataTableColumns } from "naive-ui";
import { deleteCategory, selectCategoryList, updateCategorySorts, type TableCategory, type UpdateSortsVo } from '@/api/category';
import { createPagination } from '@/utils/page';
import { icons } from '@/utils/icons';
import EditTableCategoryForm from './components/EditTableCategoryForm.vue';
import NewTableCategoryForm from './components/NewTableCategoryForm.vue';
import SortTableModal from '@/components/SortTableModal.vue';

const { t } = useI18n();
const dialog = useDialog();

const editTableCategoryFormRef: Ref<InstanceType<typeof EditTableCategoryForm> | null> = ref(null);
const newTableCategoryFormRef: Ref<InstanceType<typeof NewTableCategoryForm> | null> = ref(null);

const loading = ref(false);
const data: Ref<TableCategory[]> = ref([]);
const pagination = createPagination();
const columns: DataTableColumns<TableCategory> = [
  {
    title: t('columns.name'), key: "name",
    render(row: TableCategory): VNode {
      return (
        <NFlex align='center'>
          {row.name}
          <NButton type="info" size="tiny" onClick={() => handleClickEditCategory(row.id)}>
            <NIcon component={icons.edit} />
          </NButton>
        </NFlex>
      )
    }
  },
  { title: t('columns.orderIndex'), key: "orderIndex" },
  {
    title: t('columns.actions'), key: "actions",
    render(row: TableCategory): VNode {
      return (
        <NButton type="error" onClick={() => handleClickDeleteCategory(row.id)}>
          {t('button.delete')}
        </NButton>
      )
    }
  }
];

async function loadData() {
  loading.value = true;
  try {
    const categories = await selectCategoryList({});
    if (categories != null) {
      data.value = [...categories];
    }
  } finally {
    loading.value = false;
  }
}

function handleClickNewCategory() {
  newTableCategoryFormRef.value?.open();
}

function handleClickSortCategories() {
  sortCategoriesSetting.show = true;
}

function handleClickEditCategory(id: number) {
  editTableCategoryFormRef.value?.open(id);
}

function handleClickDeleteCategory(id: number) {
  let loading = false;
  dialog.create({
    loading: loading,
    title: t('title.admin.deleteCategory'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      loading = true;
      try {
        await deleteCategory(id);
        loadData();
      } finally {
        loading = false;
      }
    }
  });
}

const sortCategoriesSetting = reactive({
  show: false,
  title: t('title.sortCategories'),
  queryFunc: () => {
    return selectCategoryList({});
  },
  handleUpdateSort: async (ids: number[]) => {
    loading.value = true;
    const params: UpdateSortsVo[] = ids.map((id, i) => {
      return {
        id: id,
        orderIndex: i
      };
    });

    try {
      await updateCategorySorts(params)
      loadData();
    } finally {
      loading.value = false;
    }
  },
  labelField: "name",
  keyField: "id"
})

loadData();
</script>
