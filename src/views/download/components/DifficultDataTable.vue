<!-- 
  Render a table component of a difficult table from server

  Unlike LevelDataTable, this component renders a 'flatten' version of sabuns,
    LevelDataTable is rendering a 2-levels table: first is levels, second is
    sabuns under the level. This causes search under a difficult table cannot
    be done. You simply cannot search cross 2 levels.

  Therefore, DifficultDataTable is aiming to fix this problem by 'flatting'
    the data from 2-levels to 1. Making the difficult level as a field instead
    of a separated table. This allows us to search things under a difficult 
    table.
-->
<template>
  <!-- Search Area -->
  <n-flex gap="8" vertical>
    <n-flex gap="8" horizontal :wrap="false">
      <n-input-group>
        <n-input v-model:value="fuzzyKeyword" clearable :placeholder="t('placeholder.searchFuzzyKeyword')">
          <template #prefix>
            <n-icon :component="SearchIcon" />
          </template>
        </n-input>
        <n-button type="primary" @click="clickSearch">
          {{ t('button.search') }}
        </n-button>
      </n-input-group>

      <n-button type="info" @click="useAdvancedSearch = !useAdvancedSearch">
        <template #icon>
          <n-icon :component="AdvancedSearchIcon" />
        </template>
      </n-button>
    </n-flex>
    <template v-if="useAdvancedSearch">
      <n-input-group>
        <n-input v-model:value="titleLike" clearable :placeholder="t('placeholder.searchFuzzyTitle')" />
        <n-input v-model:value="artistLike" clearable :placeholder="t('placeholder.searchFuzzyArtist')" />
      </n-input-group>
    </template>
  </n-flex>

  <!-- data table -->
  <div style="margin-top: 8px;">
    <n-data-table v-if="disableCard" remote :loading="loading" :columns="columns" :data="data" :pagination="pagination"
      :row-key="(row: FileEntryDto) => row.downloadURL" />
    <n-card v-else>
      <n-data-table remote :loading="loading" :columns="columns" :data="data" :pagination="pagination"
        :row-key="(row: FileEntryDto) => row.downloadURL" />
    </n-card>
  </div>
</template>

<script lang="tsx" setup>
import { reactive, ref, watch, type Ref, type VNode } from 'vue';
import { debounce } from 'lodash-es';
import { selectDataList, type DownloadableTableDataDto, type QueryTableDataVo } from '@/api/table';
import type { FileEntryDto } from '@/api/files';
import { useI18n } from 'vue-i18n';
import { SearchOutline as SearchIcon, ColorWandOutline as AdvancedSearchIcon, DownloadOutline as DownloadIcon } from '@vicons/ionicons5';
import { NButton, NIcon, type DataTableColumns } from 'naive-ui';
import SongTitleParagraph from '@/components/SongTitleParagraph.vue';
import { humanFileSize } from '@/utils/format';
import DownloadButton from './DownloadButton.vue';

const props = defineProps<{
  tableID: number | null,
  disableCard?: boolean
}>();

const { t } = useI18n();

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

const loading = ref(false);
// searching parameters 
const fuzzyKeyword: Ref<string | null> = ref(null);
const titleLike: Ref<string | null> = ref(null);
const artistLike: Ref<string | null> = ref(null);

// show advanced search tab?
const useAdvancedSearch = ref(false);

let data: Ref<DownloadableTableDataDto[]> = ref([]);
const columns: DataTableColumns<DownloadableTableDataDto> = [
  {
    title: t('columns.title'), key: "title",
    render: (row: DownloadableTableDataDto): VNode => {
      return (
        <SongTitleParagraph lost={!row.downloadURL} data={row} />
      )
    }
  },
  {
    title: t('columns.level'), key: "level",
  },
  {
    title: t('columns.size'), key: "fileSize",
    render(row) {
      return humanFileSize(row.fileSize)
    }
  },
  {
    title: t('columns.actions'), key: "actions",
    render(row): VNode | null {
      if (!row.downloadURL) {
        return null;
      }
      return (
        <DownloadButton downloadURL={row.downloadURL} />
      )
    }
  }
];

function loadData() {
  let query: QueryTableDataVo = {
    pageRequest: {
      page: pagination.page,
      pageSize: pagination.pageSize,
    },
    headerID: props.tableID!!,
    fuzzyKeyword: fuzzyKeyword.value ?? null,
  }

  if (useAdvancedSearch.value) {
    query.artistLike = artistLike.value ?? null;
    query.titleLike = titleLike.value ?? null;
  }

  selectDataList(query)
    .then(result => {
      if (result.data != null) {
        data.value = [...result.data];
        pagination.pageCount = result.pageCount;
      }
    }).finally(() => { loading.value = false });
}

function clickSearch() {
  debouncedLoadData.cancel();
  loadData();
}

const debouncedLoadData = debounce(loadData, 500);

watch([() => props.tableID, fuzzyKeyword, titleLike, artistLike], () => {
  loading.value = true;
  pagination.page = 1;
  debouncedLoadData();
}, { immediate: true });
</script>
