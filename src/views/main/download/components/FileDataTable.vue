<!-- Render a table component of the package entries from server -->
<template>
  <!-- Search Area -->
  <n-flex gap="8" vertical>
    <n-flex gap="8" horizontal class="search-row">
      <n-input-group class="search-input">
        <n-input v-model:value="fuzzyKeyword" clearable :placeholder="t('placeholder.searchFuzzyKeyword')" autofocus>
          <template #prefix>
            <n-icon :component="icons.search" />
          </template>
        </n-input>
        <n-button type="primary" @click="clickSearch">
          {{ t('button.search') }}
        </n-button>
      </n-input-group>

      <n-button-group>
        <n-button :type="useCardView ? 'primary' : 'default'" @click="useCardView = true">
          <n-icon :component="icons.grid" />
        </n-button>
        <n-button :type="!useCardView ? 'primary' : 'default'" @click="useCardView = false">
          <n-icon :component="icons.list" />
        </n-button>
      </n-button-group>

      <n-button type="info" @click="useAdvancedSearch = !useAdvancedSearch">
        <template #icon>
          <n-icon :component="icons.advancedSearch" />
        </template>
      </n-button>
    </n-flex>
    <div class="advanced-wrap" :class="{ 'advanced-wrap--open': useAdvancedSearch }">
      <div class="advanced-inner">
        <n-input-group class="advanced-group">
          <n-input v-model:value="fileNameLike" clearable :placeholder="t('placeholder.searchFuzzyFileName')" />
          <n-input v-model:value="titleLike" clearable :placeholder="t('placeholder.searchFuzzyTitle')" />
          <n-input v-model:value="artistLike" clearable :placeholder="t('placeholder.searchFuzzyArtist')" />
        </n-input-group>
      </div>
    </div>
  </n-flex>

  <!-- data table, auto hide itself if no data -->
  <template v-if="data.length > 0">
    <template v-if="useCardView">
      <div class="scroll-container">
        <n-infinite-scroll :distance="100" @load="loadData">
          <n-spin :show="loading">
            <div class="cards-grid results-anim" :key="resultAnimKey">
              <PackageCard v-for="item in data" :key="item.id" :fileEntry="item" />
            </div>
          </n-spin>
          <n-divider v-if="noMore" />
        </n-infinite-scroll>
      </div>
    </template>
    <template v-else>
      <div class="results-anim" :key="resultAnimKey">
        <n-data-table v-if="disableCard" remote :loading="loading" :columns="columns" :data="data" :scroll-x="640"
          :pagination="pagination" rowClassName="common-row" :row-key="(row: FileEntryDto) => row.downloadURL" striped />
        <n-card v-else>
          <n-data-table remote :loading="loading" :columns="columns" :data="data" :scroll-x="640" :pagination="pagination"
            rowClassName="common-row" :row-key="(row: FileEntryDto) => row.downloadURL" striped />
        </n-card>
      </div>
    </template>
  </template>

  <!-- placeholder so a pending first search gives immediate feedback -->
  <template v-else-if="loading">
    <div v-if="useCardView" class="cards-grid">
      <n-skeleton v-for="i in 6" :key="i" height="100px" :sharp="false" />
    </div>
    <n-flex v-else vertical :size="8" style="margin-top: 8px;">
      <n-skeleton v-for="i in 5" :key="i" height="40px" :sharp="false" />
    </n-flex>
  </template>
</template>

<script lang="tsx" setup>
import { findFileEntries, type FileEntryDto, type QueryFileEntryVo } from '@/api/files';
import { NButton, NIcon, type DataTableColumns, NFlex, NInput } from 'naive-ui';
import { reactive, ref, watch, type Ref, type VNode } from 'vue';
import { debounce } from 'lodash-es';
import { useI18n } from 'vue-i18n';
import { humanFileSize } from '@/utils/format';
import SongDataTable from './SongDataTable.vue';
import FileDownloadButton from './FileDownloadButton.vue';
import FileName from '@/components/FileName.vue';
import { icons } from '@/utils/icons';
import PackageCard from '@/components/PackageCard.vue';

const { t } = useI18n();
const props = defineProps<{
  tableID?: number | null,
  disableCard?: boolean
}>();

const loading: Ref<boolean> = ref(false);
const noMore: Ref<boolean> = ref(false);

// Bumped only when results are fully replaced (new query / view switch), so the
// enter animation never replays on infinite-scroll appends.
const resultAnimKey = ref(0);
let pendingFresh = true;

// searching parameters
const fuzzyKeyword: Ref<string | null> = ref(null);
const fileNameLike: Ref<string | null> = ref(null);
const titleLike: Ref<string | null> = ref(null);
const artistLike: Ref<string | null> = ref(null);

// show advanced search tab?
const useAdvancedSearch = ref(false);

const useCardView = ref(true);

let data: Ref<Array<FileEntryDto>> = ref([]);

const pagination = reactive({
  page: 1,
  pageSize: 20,
  pageCount: 0,
  showSizePicker: true,
  pageSizes: [20, 50, 100],
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

const columns: DataTableColumns<FileEntryDto> = [
  {
    type: "expand",
    renderExpand(row: FileEntryDto): VNode {
      return (
        <SongDataTable entryID={row.id} />
      )
    }
  },
  {
    title: t('columns.name'), key: "fileName",
    render(row: FileEntryDto): VNode {
      return <FileName fileEntry={row} />
    }
  },
  {
    title: t('columns.size'), key: "fileSize",
    render(row: FileEntryDto) {
      return humanFileSize(row.fileSize);
    }
  },
  {
    title: t('columns.actions'), key: "actions",
    render(row: FileEntryDto): VNode {
      return (
        <FileDownloadButton fileEntry={row} />
      )
    }
  }
];

const debouncedLoadData = debounce(loadData, 500);

async function loadData() {
  console.log('triggered, with page: ', pagination.page);
  let query: QueryFileEntryVo = {
    pageRequest: {
      page: pagination.page,
      pageSize: pagination.pageSize
    },

    fuzzyKeyword: fuzzyKeyword.value ?? null,
    md5: "",
    tableID: props.tableID,
    useDirectURL: false
  };

  if (useAdvancedSearch.value) {
    query.fileNameLike = fileNameLike.value ?? null;
    query.titleLike = titleLike.value ?? null;
    query.artistLike = artistLike.value ?? null;
  }

  try {
    const result = await findFileEntries(query)
    if (result.data != null) {
      if (useCardView.value && query.pageRequest.page == 1) {
        data.value = [];
      }
      pagination.pageCount = result.pageCount;
      if (result.data.length > 0) {
        if (useCardView.value) {
          data.value.push(...result.data);
          pagination.page += 1;
        } else {
          data.value = [...result.data];
        }
      }
      if (result.data.length < pagination.pageSize) {
        noMore.value = true;
      }
      if (pendingFresh) {
        resultAnimKey.value += 1;
      }
    }
  } finally {
    loading.value = false;
    pendingFresh = false;
  }
}

function clickSearch() {
  debouncedLoadData.cancel();
  loading.value = true;
  pendingFresh = true;
  pagination.page = 1;
  loadData();
}

watch([() => props.tableID, fuzzyKeyword, fileNameLike, titleLike, artistLike, useCardView], () => {
  loading.value = true;
  pendingFresh = true;
  pagination.page = 1;
  debouncedLoadData();
});
</script>

<style scoped>
:deep(.n-data-table-tr--expanded:not(.common-row) > td) {
  padding: 0 !important;
}

.search-row .search-input {
  flex: 1 1 240px;
  min-width: 0;
}

.advanced-group {
  display: flex;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.cards-grid > * {
  min-width: 0;
}

@media (min-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.scroll-container {
  margin-top: 8px;
}

.advanced-wrap {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows 200ms ease-out, visibility 0s linear 200ms;
}

.advanced-wrap--open {
  grid-template-rows: 1fr;
  visibility: visible;
  transition: grid-template-rows 200ms ease-out, visibility 0s;
}

.advanced-inner {
  overflow: hidden;
  min-height: 0;
}

.results-anim {
  animation: results-in 180ms ease-out;
}

@keyframes results-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {

  .advanced-wrap,
  .advanced-wrap--open {
    transition: none;
  }

  .results-anim {
    animation: none;
  }
}

@media (max-width: 767px) {
  .search-row .search-input {
    flex: 1 1 100%;
  }

  .advanced-group {
    flex-direction: column;
    gap: 8px;
  }

  .advanced-group :deep(.n-input) {
    width: 100%;
    margin-left: 0;
    border-radius: 8px !important;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
