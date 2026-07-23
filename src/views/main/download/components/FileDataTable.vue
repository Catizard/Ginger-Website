<!-- Render a table component of the package entries from server -->
<template>
  <!-- Search Area -->
  <n-flex gap="8" vertical>
    <n-flex gap="8" horizontal :wrap="false">
      <n-input-group>
        <n-input v-model:value="fuzzyKeyword" clearable :placeholder="t('placeholder.searchFuzzyKeyword')" autofocus>
          <template #prefix>
            <n-icon :component="icons.search" />
          </template>
        </n-input>
        <n-button type="primary" @click="clickSearch">
          {{ t('button.search') }}
        </n-button>
      </n-input-group>

      <n-button type="info" @click="useAdvancedSearch = !useAdvancedSearch">
        <template #icon>
          <n-icon :component="icons.advancedSearch" />
        </template>
      </n-button>
    </n-flex>
    <template v-if="useAdvancedSearch">
      <n-input-group>
        <n-input v-model:value="fileNameLike" clearable :placeholder="t('placeholder.searchFuzzyFileName')" />
        <n-input v-model:value="titleLike" clearable :placeholder="t('placeholder.searchFuzzyTitle')" />
        <n-input v-model:value="artistLike" clearable :placeholder="t('placeholder.searchFuzzyArtist')" />
      </n-input-group>
    </template>
  </n-flex>

  <!-- data table, auto hide itself if no data -->
  <div style="margin-top: 8px" v-if="data.length > 0">
    <n-data-table v-if="disableCard" remote :loading="loading" :columns="columns" :data="data" :pagination="pagination"
      :row-key="(row: FileEntryDto) => row.downloadURL" />
    <n-card v-else>
      <n-data-table remote :loading="loading" :columns="columns" :data="data" :pagination="pagination"
        :row-key="(row: FileEntryDto) => row.downloadURL" />
    </n-card>
  </div>
</template>

<script lang="tsx" setup>
import { findFileEntries, type FileEntryDto, type QueryFileEntryVo } from '@/api/files';
import { NButton, NIcon, type DataTableColumns, NFlex, NInput } from 'naive-ui';
import { reactive, ref, watch, type Ref, type VNode } from 'vue';
import { debounce } from 'lodash-es';
import { useI18n } from 'vue-i18n';
import { humanFileSize } from '@/utils/format';
import SongDataTable from './SongDataTable.vue';
import DownloadButton from './DownloadButton.vue';
import FileName from '@/components/FileName.vue';
import { icons } from '@/utils/icons';

const { t } = useI18n();
const props = defineProps<{
  tableID?: number | null,
  disableCard?: boolean
}>();

const loading: Ref<boolean> = ref(false);

// searching parameters
const fuzzyKeyword: Ref<string | null> = ref(null);
const fileNameLike: Ref<string | null> = ref(null);
const titleLike: Ref<string | null> = ref(null);
const artistLike: Ref<string | null> = ref(null);

// show advanced search tab?
const useAdvancedSearch = ref(false);

let data: Ref<Array<FileEntryDto>> = ref([]);

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

const columns: DataTableColumns<FileEntryDto> = [
  {
    type: "expand",
    renderExpand(row: FileEntryDto): VNode {
      console.log(row);
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
    render(row) {
      return humanFileSize(row.fileSize);
    }
  },
  {
    title: t('columns.actions'), key: "actions",
    render(row): VNode {
      return (
        <DownloadButton downloadURL={row.downloadURL} />
      )
    }
  }
];

const debouncedLoadData = debounce(loadData, 500);

function loadData() {
  let query: QueryFileEntryVo = {
    pageRequest: {
      page: pagination.page,
      pageSize: pagination.pageSize
    },

    fuzzyKeyword: fuzzyKeyword.value ?? null,
    md5: "",
    tableID: props.tableID,
  };

  if (useAdvancedSearch.value) {
    query.fileNameLike = fileNameLike.value ?? null;
    query.titleLike = titleLike.value ?? null;
    query.artistLike = artistLike.value ?? null;
  }

  findFileEntries(query)
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

watch([() => props.tableID, fuzzyKeyword, fileNameLike, titleLike, artistLike], () => {
  loading.value = true;
  pagination.page = 1;
  debouncedLoadData();
});
</script>

<style scoped>
.download-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
  overflow: hidden;
}
</style>
