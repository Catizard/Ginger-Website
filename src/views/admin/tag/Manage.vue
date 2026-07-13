<!-- Manage the color tags on server -->
<template>
  <TitleWithButtons :title="t('title.admin.tagManage')">
    <n-button type="primary" @click="handleClickNewTag">
      {{ t('button.newTag') }}
    </n-button>
  </TitleWithButtons>
  <n-data-table :loading="loading" :data="data" :pagination="pagination" :columns="columns" />
  <EditColorTagForm ref="editColorTagFormRef" @submit="loadData" />
  <NewColorTagForm ref="newColorTagFormRef" @submit="loadData" />
</template>

<script setup lang="tsx">
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { ref, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import { NButton, NDataTable, NFlex, NIcon, useDialog, type DataTableColumns } from "naive-ui";
import { createPagination } from '@/utils/page';
import { icons } from '@/utils/icons';
import EditColorTagForm from './components/EditColorTagForm.vue';
import NewColorTagForm from './components/NewColorTagForm.vue';
import ColorTagPreview from '@/components/ColorTag.vue';
import { deleteTag, selectColorTagList, type ColorTag } from '@/api/tags';

const { t } = useI18n();
const dialog = useDialog();

const editColorTagFormRef: Ref<InstanceType<typeof EditColorTagForm> | null> = ref(null);
const newColorTagFormRef: Ref<InstanceType<typeof NewColorTagForm> | null> = ref(null);

const loading = ref(false);
const data: Ref<ColorTag[]> = ref([]);
const pagination = createPagination();
const columns: DataTableColumns<ColorTag> = [
  {
    title: t('columns.name'), key: "tagName",
    render(row: ColorTag): VNode {
      return (
        <NFlex align='center' >
          {row.tagName}
          < NButton type="info" size="tiny" onClick={() => handleClickEditTag(row.id)}>
            <NIcon component={icons.edit} />
          </NButton>
        </NFlex>
      )
    }
  },
  {
    title: t('columns.preview'), key: "actions",
    render(row: ColorTag): VNode {
      return (
        <ColorTagPreview name={row.tagName} color={row.tagColor} textColor={row.tagTextColor} comment={row.tagComment} />
      )
    }
  },
  {
    title: t('columns.actions'), key: "actions",
    render(row: ColorTag): VNode {
      return (
        <NButton type="error" onClick={() => handleClickDeleteTag(row.id)}>
          {t('button.delete')}
        </NButton>
      )
    }
  }
];

async function loadData() {
  loading.value = true;
  try {
    const tags = await selectColorTagList({});
    if (tags != null) {
      data.value = [...tags];
    }
  } finally {
    loading.value = false;
  }
}

function handleClickNewTag() {
  newColorTagFormRef.value?.open();
}

function handleClickEditTag(id: number) {
  editColorTagFormRef.value?.open(id);
}

function handleClickDeleteTag(id: number) {
  let loading = false;
  dialog.create({
    loading: loading,
    title: t('title.admin.deleteTag'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      loading = true;
      try {
        await deleteTag(id);
        loadData();
      } finally {
        loading = false;
      }
    }
  });
}

loadData();
</script> -->
