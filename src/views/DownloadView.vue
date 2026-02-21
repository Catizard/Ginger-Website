<template>
  <n-input v-model:value="fileNameLike" style="width: 350px;"
    placeholder="Search by package name, press enter to submit" @keyup.enter="loadData()" />
  <n-data-table remote :loading="loading" :columns="columns" :data="data" :pagination="pagination"
    :row-key="(row: FileEntryDto) => row.downloadURL" />
</template>

<script setup lang="tsx">
import { NButton, NIcon } from 'naive-ui';
import { findFileEntries, type FileEntryDto } from '@/api/files';
import type { DataTableColumns } from 'naive-ui';
import { reactive, ref, type Ref, type VNode } from 'vue';
import { DownloadOutline as DownloadIcon } from '@vicons/ionicons5';

let loading = ref(false);

let data: Ref<Array<FileEntryDto>> = ref([]);
const fileNameLike = ref(null);

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
  { title: "Name", key: "fileName" },
  {
    title: "Size", key: "fileSize",
    render(row) {
      return humanFileSize(row.fileSize);
    }
  },
  {
    title: "Actions", key: "actions",
    render(row): VNode {
      return (
        <NButton type="info" onClick={() => window.open(row.downloadURL, '_blank')}>
          <NIcon>
            <DownloadIcon />
          </NIcon>
        </NButton>
      )
    }
  }
];

function loadData() {
  loading.value = true;
  findFileEntries({
    pageRequest: {
      page: pagination.page,
      pageSize: pagination.pageSize
    },
    fileNameLike: fileNameLike.value ?? "",
    md5: ""
  })
    .then(result => {
      if (result.data != null) {
        data.value = [...result.data];
        pagination.pageCount = result.pageCount;
        console.log(pagination);
      }
    }).finally(() => { loading.value = false });
}

/**
 * Format bytes as human-readable text.
 * https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}

loadData();
</script>
