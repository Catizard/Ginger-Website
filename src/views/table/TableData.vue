<template>
  <n-data-table remote :data="data" :columns="columns" :pagination="pagination"
    :row-key="(row: DownloadableTableDataDto) => row.id" />
</template>

<script setup lang="tsx">
import { selectDataList, type DownloadableTableDataDto, type TableData } from '@/api/table';
import { NButton, NIcon, type DataTableColumns } from 'naive-ui';
import { reactive, ref, watch, type Ref, type VNode } from 'vue';
import { DownloadOutline as DownloadIcon, WarningOutline as WarningIcon } from '@vicons/ionicons5';

interface Props {
  headerId?: number
  level?: string
};

const props = defineProps<Props>();

const loading = ref(false);
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
const columns: DataTableColumns<DownloadableTableDataDto> = [
  {
    title: "Title", key: "title",
    render(row: DownloadableTableDataDto): VNode[] {
      let ret: VNode[] = [];
      if (row.fileSize == 0) {
        ret.push((
          <NIcon color="red">
            <WarningIcon />
          </NIcon>
        ));
      }
      ret.push(row.title as any as VNode);
      return ret;
    }
  },
  {
    title: "Size", key: "fileSize",
    render(row) {
      return humanFileSize(row.fileSize);
    }
  },
  {
    title: "Actions", key: "actions",
    render(row): VNode | null {
      if (row.fileSize == 0) {
        return null;
      }
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
const data: Ref<TableData[]> = ref([]);

function loadData() {
  if (props.headerId == null) {
    return;
  }
  selectDataList({
    headerID: props.headerId,
    level: props.level ?? "",
    pageRequest: {
      page: pagination.page,
      pageSize: pagination.pageSize
    },
  }).then(result => {
    if (result.data != null) {
      data.value = [...result.data];
      pagination.pageCount = result.pageCount;
    }
  }).finally(() => loading.value = false);
}

watch(props, () => {
  loadData();
}, { immediate: true })

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
</script>
