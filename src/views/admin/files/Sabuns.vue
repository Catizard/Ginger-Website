<!-- Render the sabuns on the server -->
<template>
  <TitleWithButtons :title="t('title.chart')" />
  <n-card style="margin-top: 8px">
    <n-data-table remote :loading="loading" :data="data" :pagination="pagination" :columns="columns" />
  </n-card>
</template>

<script setup lang="tsx">
import { selectSongsList, type SongData } from '@/api/songs';
import SongTitleParagraph from '@/components/SongTitleParagraph.vue';
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { createPagination } from '@/utils/page';
import { type DataTableColumns, type PaginationProps } from 'naive-ui';
import { ref, type Reactive, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import CopyableHashField from '@/components/CopyableHashField.vue';
import SongBPM from '@/components/SongBPM.vue';
import PlayMode from '@/components/PlayMode.vue';
import SongTotal from '@/components/SongTotal.vue';
import prettyMS from "pretty-ms";

const { t } = useI18n();
const loading = ref(false);
const data: Ref<SongData[]> = ref([]);
const pagination: Reactive<PaginationProps> = createPagination(loadData);
const columns: DataTableColumns<SongData> = [
  {
    title: t('columns.title'), key: "title",
    render(row: SongData): VNode {
      return (
        <SongTitleParagraph lost={false} data={row} />
      )
    }
  },
  {
    title: t('columns.md5'), key: "md5", minWidth: "130px",
    render(row: SongData): VNode {
      if (row.md5 == "") {
        return (<>/</>);
      }
      return (
        <CopyableHashField hash={row.md5} maxWidth={"120px"} />
      );
    }
  },
  {
    title: t('columns.sha256'), key: "sha256", minWidth: "130px",
    render(row: SongData): VNode {
      if (row.sha256 == "") {
        return (<>/</>);
      }
      return (
        <CopyableHashField hash={row.sha256} maxWidth={"120px"} />
      )
    }
  },
  {
    title: t('columns.playMode'), key: "mode",
    render(row: SongData): VNode {
      return <PlayMode mode={row.mode} />
    }
  },
  {
    title: t('columns.length'), key: "length", width: "60px",
    render(row: SongData): VNode {
      return (
        <>
          {prettyMS(row.length, { colonNotation: true, secondsDecimalDigits: 0 })}
        </>
      )
    }
  },
  {
    title: t('columns.bpm'), key: "bpm", width: "120px",
    render(row: SongData): VNode {
      return (
        <SongBPM bpm={row.bpm} minBPM={row.minBPM} maxBPM={row.maxBPM} />
      )
    }
  },
  {
    title: t('columns.total'), key: "total", width: "200px",
    render(row: SongData): VNode {
      return (
        <SongTotal total={row.total} notes={row.notes} />
      )
    }
  },
  {
    title: t('columns.notes'), key: "notes", width: "75px",
  },
  { title: t('columns.name'), key: "fileName", }
];

async function loadData() {
  loading.value = true;
  try {
    const songs = await selectSongsList({
      pageRequest: {
        page: pagination.page!!,
        pageSize: pagination.pageSize!!
      },
    });
    if (songs.data != null) {
      pagination.pageCount = songs.pageCount;
      data.value = [...songs.data];
      console.log(data.value);
    }
  } finally {
    loading.value = false;
  }
}

loadData();
</script>
