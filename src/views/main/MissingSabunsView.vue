<template>
  <TitleWithButtons :title="t('title.missingSabuns')" />
  <!-- Search Area -->
  <n-flex gap="8" vertical>
    <n-flex gap="8" horizontal :wrap="false">
      <n-input-group>
        <n-input v-model:value="titleLike" clearable :placeholder="t('placeholder.searchFuzzyTitle')">
          <template #prefix>
            <n-icon :component="icons.search" />
          </template>
        </n-input>
        <n-select v-model:value="tableID" :options="tableOptions" clearable />
        <n-select v-model:value="urlStrategy" :options="urlStrategyOptions" />
        <n-button type="primary" @click="loadData()">
          {{ t('button.search') }}
        </n-button>
      </n-input-group>
    </n-flex>
  </n-flex>

  <n-card>
    <n-data-table remote :loading="loading" :data="data" :columns="columns" :pagination="pagination"
      :row-key="(row: MissingTableData) => row.id" />
  </n-card>

</template>

<script setup lang="tsx">
import { selectHeaderList, selectMissingSabunList, type MissingTableData, type URLStrategy } from '@/api/table';
import SongTitleParagraph from '@/components/SongTitleParagraph.vue';
import { useI18n } from 'vue-i18n';
import { Link } from '@vicons/ionicons5';
import { NButton, NIcon, NDataTable, type DataTableColumns, NFlex, type SelectOption } from 'naive-ui';
import { onMounted, ref, watch, type Ref, type VNode } from 'vue';
import { icons } from "@/utils/icons";
import { createPagination } from '@/utils/page';
import TitleWithButtons from '@/components/TitleWithButtons.vue';

const { t } = useI18n();

const loading = ref(false);

// Search parameters
const titleLike = ref("");
const urlStrategy: Ref<URLStrategy> = ref("HIDE_NO_URL");
const urlStrategyOptions = [
  {
    label: t('desc.hideNoURLCharts'),
    value: "HIDE_NO_URL",
  },
  {
    label: t('desc.showAllCharts'),
    value: "SHOW_ALL"
  }
];
const tableID: Ref<number | null> = ref(null);
const tableOptions: Ref<SelectOption[]> = ref([]);

const data: Ref<MissingTableData[]> = ref([]);
const columns: DataTableColumns<MissingTableData> = [
  {
    title: t('columns.title'), key: "title",
    render: (row: MissingTableData): VNode => {
      // To not render the missing icon
      return (
        <SongTitleParagraph lost={false} data={row} />
      )
    }
  },
  {
    title: "md5", key: "md5"
  },
  {
    title: t('columns.table'), key: "headerName",
  },
  {
    title: t('columns.symbol'), key: "headerSymbol"
  },
  {
    title: t('columns.level'), key: "level",
  },
  {
    title: t('columns.actions'), key: "actions",
    render: (row: MissingTableData): VNode | null => {
      if (!row.url) {
        return null;
      }
      return (
        <NFlex>
          <NButton type="info" round size='small' onClick={() => window.open(row.url, '')}>
            <NIcon>
              <Link />
            </NIcon>
          </NButton>
          {
            row.urlDiff != null && row.urlDiff != "" && (
              <NButton v-if={row.urlDiff != null && row.urlDiff != ""} type="tertiary" round size='small' onClick={() => window.open(row.urlDiff, '')}>
                <NIcon>
                  <Link />
                </NIcon>
              </NButton>
            )
          }
        </NFlex>
      )
    }
  }
];
const pagination = createPagination(loadData);

async function loadData() {
  loading.value = true;
  try {
    const ret = await selectMissingSabunList({
      pageRequest: {
        page: pagination.page!!,
        pageSize: pagination.pageSize!!
      },
      headerID: tableID.value,
      urlStrategy: urlStrategy.value,
    });

    if (ret.data != null) {
      data.value = [...ret.data];
      pagination.pageCount = ret.pageCount;
    }
  } finally {
    loading.value = false;
  }
}

async function loadTables() {
  loading.value = true;
  try {
    const headers = await selectHeaderList({});
    tableOptions.value = [...headers.map(it => {
      return {
        label: it.name,
        value: it.id
      };
    })];
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadTables();
  loadData();
});

watch([titleLike, urlStrategy, tableID], () => {
  pagination.pageCount = 1;
  loadData();
});
</script>
