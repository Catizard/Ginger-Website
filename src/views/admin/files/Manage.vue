<!-- Manage the files on the server, you can also view this component as the internal version of FileDataTable -->
<template>
  <TitleWithButtons :title="t('title.admin.filesManage')" />
  <!-- Search Area -->
  <n-flex gap="8" vertical>
    <n-flex gap="8" horizontal :wrap="false">
      <n-input-group>
        <n-input v-model:value="fuzzyKeyword" clearable :placeholder="t('placeholder.searchFuzzyKeyword')" autofocus>
          <template #prefix>
            <n-icon :component="icons.search" />
          </template>
        </n-input>
        <n-button type="primary" @click="loadData()">
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
      <n-input-group>
        <n-checkbox v-model:checked="missingAnyAudio">
          {{ t('misc.missingAnyAudio') }}
        </n-checkbox>
        <n-checkbox v-model:checked="noSabunInside">
          {{ t('misc.noSabunInside') }}
        </n-checkbox>
      </n-input-group>
    </template>
  </n-flex>
  <!-- Table Area -->
  <n-data-table remote :loading="loading" :columns="columns" :data="data" :pagination="pagination"
    :row-key="(row: FileEntryDto) => row.downloadURL" @update:sorter="handleUpdateSorter" />
</template>

<script setup lang="tsx">
import { findFileEntries, fullDeleteFile, type FileEntryDto, type QueryFileEntryVo } from '@/api/files';
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { NButton, NTime, useDialog, type DataTableColumns, type DataTableSortState } from 'naive-ui';
import { ref, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import SongDataTable from '@/views/main/download/components/SongDataTable.vue';
import { humanFileSize } from '@/utils/format';
import { createPagination } from '@/utils/page';
import { Convert, type Sorter } from '@/api/sorter';
import FileName from '@/components/FileName.vue';
import { icons } from '@/utils/icons';

const { t } = useI18n();
const dialog = useDialog();

const loading: Ref<boolean> = ref(false);
let data: Ref<Array<FileEntryDto>> = ref([]);
const pagination = createPagination(loadData);
const sorter: Ref<Sorter> = ref({});

// Search parameters
const fuzzyKeyword: Ref<string | null> = ref(null);

const useAdvancedSearch = ref(false);
const fileNameLike: Ref<string | null> = ref(null);
const titleLike: Ref<string | null> = ref(null);
const artistLike: Ref<string | null> = ref(null);
const missingAnyAudio = ref(false);
const noSabunInside = ref(false);

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
      return (
        <FileName fileEntry={row} />
      )
    }
  },
  {
    title: t('columns.size'), key: "fileSize", sorter: true,
    render(row) {
      return humanFileSize(row.fileSize);
    }
  },
  { title: t('columns.songCount'), key: "songCount", },
  {
    title: t('columns.time'), key: "createTime",
    render(row: FileEntryDto): VNode {
      return (
        <NTime time={row.createTime} unix />
      )
    }
  },
  {
    title: t('columns.actions'), key: "actions",
    render(row: FileEntryDto): VNode {
      return (
        <NButton type="error" onClick={() => handleClickDeleteFile(row.id)}>
          {t('button.delete')}
        </NButton>
      )
    }
  }
];

function loadData() {
  let query: QueryFileEntryVo = {
    pageRequest: {
      page: pagination.page!!,
      pageSize: pagination.pageSize!!
    },
    orderBy: sorter.value.orderBy,
    orderDirection: sorter.value.orderDirection,
    fuzzyKeyword: fuzzyKeyword.value ?? null,
  };

  if (useAdvancedSearch.value) {
    query.fileNameLike = fileNameLike.value ?? null;
    query.titleLike = titleLike.value ?? null;
    query.artistLike = artistLike.value ?? null;
    query.missingAnyAudio = missingAnyAudio.value ?? null;
    query.noSabunInside = noSabunInside.value ?? null;
  }

  console.log('query: ', query);

  findFileEntries(query)
    .then(result => {
      if (result.data != null) {
        pagination.pageCount = result.pageCount;
        data.value = [...result.data];
      }
    }).finally(() => { loading.value = false });
}

function handleClickDeleteFile(id: number) {
  let loading = false;
  dialog.create({
    loading: loading,
    title: t('title.admin.fullDeleteFile'),
    negativeText: t('button.cancel'),
    positiveText: t('button.yes'),
    onPositiveClick: async () => {
      loading = true;
      try {
        await fullDeleteFile(id);
        loadData();
      } finally {
        loading = false;
      }
    }
  });
}

function handleUpdateSorter(option: DataTableSortState) {
  sorter.value = Convert(option);
  loadData();
}

loadData();
</script>
