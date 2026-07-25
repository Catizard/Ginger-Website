<!-- Show the missing sabuns on the server, it's almost equals to the MissingSabunsView.
  The difference here is this page shows some internal buttons that can sync the data or
  mark the data not trustable or something.
-->
<template>
  <TitleWithButtons :title="t('title.missingSabuns')">
    <n-button type="primary" @click="handleClickSyncMissingSabuns">
      {{ t('button.sync') }}
    </n-button>
  </TitleWithButtons>
  <n-data-table remote :loading="loading" :data="data" :columns="columns" :pagination="pagination" />
</template>

<script setup lang="tsx">
import type { MissingTableData } from '@/api/table';
import { NButton, NEllipsis, NFlex, NIcon, NText, useDialog, type DataTableColumns } from 'naive-ui';
import { ref, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import SongTitleParagraph from '@/components/SongTitleParagraph.vue';
import { createPagination } from '@/utils/page';
import { selectMissingSabunList, updateMissingSabuns } from '@/api/table';
import { icons } from "@/utils/icons";
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import CopyableHashField from '@/components/CopyableHashField.vue';

const { t } = useI18n();
const dialog = useDialog();

const loading = ref(false);
const data: Ref<MissingTableData[]> = ref([]);
const columns: DataTableColumns<MissingTableData> = [
  {
    title: t('columns.title'), key: "title",
    render: (row: MissingTableData): VNode => {
      // To not render the missing icon
      return (
        <SongTitleParagraph lost={false} data={row} />
      );
    }
  },
  {
    title: "md5", key: "md5",
    render(row: MissingTableData): VNode {
      if (row.md5 == "") {
        return (<>/</>);
      }
      return (
        <CopyableHashField hash={row.md5} maxWidth={"240px"} />
      );
    }
  },
  {
    title: "sha256", key: "sha256",
    render(row: MissingTableData): VNode {
      if (row.sha256 == "") {
        return (<>/</>);
      }
      return (
        <CopyableHashField hash={row.sha256} maxWidth={"240px"} />
      );
    }
  },
  { title: t('columns.table'), key: "headerName", },
  { title: t('columns.symbol'), key: "headerSymbol" },
  { title: t('columns.level'), key: "level", },
  {
    title: t('columns.actions'), key: "actions",
    render: (row: MissingTableData): VNode | null => {
      if (!row.url) {
        return null;
      }
      return (
        <NFlex>
          <NButton type="info" round size='small' onClick={() => window.open(row.url, '')}>
            <NIcon component={icons.link} />
          </NButton>
          {
            row.urlDiff != null && row.urlDiff != "" && (
              <NButton v-if={row.urlDiff != null && row.urlDiff != ""} type="tertiary" round size='small' onClick={() => window.open(row.urlDiff, '')}>
                <NIcon component={icons.link} />
              </NButton>
            )
          }
        </NFlex>
      );
    }
  }
];
const pagination = createPagination(loadData);

function loadData() {
  loading.value = true;
  selectMissingSabunList({
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

function handleClickSyncMissingSabuns() {
  let loading = false;
  dialog.create({
    loading: loading,
    title: t('title.admin.syncMissingSabuns'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      loading = true;
      try {
        await updateMissingSabuns();
        window.$notifyInfo(t('dialog.requestSent'));
      } finally {
        loading = false;
      }
    }
  });
}

async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    window.$notifySuccess(t('dialog.copiedSuccessfully'));
  } catch (err) {
    console.error(err);
    window.$notifyError(t("dialog.copiedUnsuccessfully", { reason: err }));
  }
}

loadData();
</script>
