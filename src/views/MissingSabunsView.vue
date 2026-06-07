<template>
  <n-data-table remote :loading="loading" :data="data" :columns="columns" :pagination="pagination" />
</template>

<script setup lang="tsx">
import { selectMissingSabunList, type MissingTableData } from '@/api/table';
import SongTitleParagraph from '@/components/SongTitleParagraph.vue';
import { useI18n } from '@/i18n';
import { Link } from '@vicons/ionicons5';
import { NButton, NIcon, NDataTable, type DataTableColumns, NFlex, NDropdown } from 'naive-ui';
import { reactive, ref, type Ref, type VNode } from 'vue';

const { t } = useI18n();

const loading = ref(false);
const data: Ref<MissingTableData[]> = ref([]);
const columns: DataTableColumns<MissingTableData> = [
  {
    title: t.value('title'), key: "title",
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
    title: t.value('table'), key: "headerName",
  },
  {
    title: t.value('symbol'), key: "headerSymbol"
  },
  {
    title: t.value('level'), key: "level",
  },
  {
    title: t.value('actions'), key: "actions",
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
        </NFlex>
      )
    }
  }
];
const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page: number) => {
    pagination.page = page;
    loadData();
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    loadData();
  }
});

function loadData() {
  loading.value = true;
  selectMissingSabunList({
    pageRequest: pagination,
  }).then(result => {
    if (result.data != null) {
      data.value = [...result.data];
      pagination.page = result.page;
      pagination.pageCount = result.pageCount;
      pagination.pageSize = result.pageSize;
    }
    console.log(result.data);
  }).catch(err => {
    console.error(err);
  }).finally(() => loading.value = false);
}

console.log('1');
loadData();
</script>
