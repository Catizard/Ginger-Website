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
import { selectDataList, type DownloadableTableDataDto, type QueryTableDataVo, type TableHeader } from '@/api/table';
import type { FileEntryDto } from '@/api/files';
import { useI18n } from 'vue-i18n';
import { SearchOutline as SearchIcon, ColorWandOutline as AdvancedSearchIcon } from '@vicons/ionicons5';
import { NButton, NIcon, type DataTableColumns } from 'naive-ui';
import SongTitleParagraph from '@/components/SongTitleParagraph.vue';
import { humanFileSize } from '@/utils/format';
import DownloadButton from './DownloadButton.vue';
import ColorTag from '@/components/ColorTag.vue';
import JudgeRank from '@/components/JudgeRank.vue';
import SongTotal from '@/components/SongTotal.vue';
import SongBPM from '@/components/SongBPM.vue';

const props = defineProps<{
  tableID: number | null,
  header: TableHeader | null,
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
    title: t('columns.level'), key: "level", width: "75px", align: "center",
    render(row: DownloadableTableDataDto): VNode {
      return (
        <ColorTag
          name={tagName(row.level)}
          color={tagColor()}
          textColor={tagTextColor()}
          comment={tagComment()}
        />
      )
    }
  },
  {
    title: t('columns.title'), key: "title",
    render: (row: DownloadableTableDataDto): VNode => {
      return (
        <SongTitleParagraph lost={!row.downloadURL} data={row} />
      )
    }
  },
  {
    title: t('columns.judge'), key: "judge", width: "125px", align: "center",
    render(row: DownloadableTableDataDto): VNode {
      return (
        <JudgeRank judgeRank={row.judgeRank} />
      )
    }
  },
  {
    title: t('columns.bpm'), key: "bpm", width: "175px", align: "center",
    render(row: DownloadableTableDataDto): VNode {
      return (
        <SongBPM bpm={row.bpm} minBPM={row.minBPM} maxBPM={row.maxBPM} />
      )
    }
  },
  {
    title: t('columns.total'), key: "total", width: "175px", align: "center",
    render(row: DownloadableTableDataDto): VNode {
      return (
        <SongTotal notes={row.notes} total={row.total} />
      )
    }
  },
  {
    title: t('columns.size'), key: "fileSize", width: "125px", align: "center",
    render(row) {
      return humanFileSize(row.fileSize)
    }
  },
  {
    title: t('columns.actions'), key: "actions", width: "85px", align: "center",
    render(row): VNode | null {
      if (!row.downloadURL) {
        return null;
      }
      return (
        <DownloadButton downloadURL={row.downloadURL} disabled={row.downloadURL == ""} showText={false} />
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

function tagName(level: string): string {
  if (props.header == null || props.header.tagName == "") {
    return level;
  }
  console.log('in tagName, level: ', level, "tagName: ", props.header.tagName)
  return `${props.header.tagName}${level}`;
}

function tagColor(): string | null {
  return props.header?.tagColor ?? null;
}

function tagTextColor(): string | null {
  return props.header?.tagTextColor ?? null;
}

function tagComment(): string | null {
  return props.header?.tagComment ?? null;
}

watch([() => props.tableID, fuzzyKeyword, titleLike, artistLike], () => {
  loading.value = true;
  pagination.page = 1;
  debouncedLoadData();
}, { immediate: true });
</script>
