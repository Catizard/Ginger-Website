<!-- Renders the songs under a file on server -->
<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :rowKey="(sd: SongData) => sd.id" />
</template>

<script setup lang="tsx">
import { querySongsByEntryID, type SongData } from '@/api/songs';
import SongTitleParagraph from '@/components/SongTitleParagraph.vue';
import type { DataTableColumns } from 'naive-ui';
import { reactive, ref, watch, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import JudgeRank from '@/components/JudgeRank.vue';
import SongBPM from '@/components/SongBPM.vue';
import SongTotal from '@/components/SongTotal.vue';

const { t } = useI18n();

const props = defineProps<{
  entryID: number,
}>();

const loading = ref(false);
const data: Ref<SongData[]> = ref([]);
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
    title: t('columns.judge'), key: "judge", width: "125px", align: "center",
    render(row: SongData): VNode {
      return (
        <JudgeRank judgeRank={row.judgeRank} />
      )
    }
  },
  {
    title: t('columns.bpm'), key: "bpm", width: "175px", align: "center",
    render(row: SongData): VNode {
      return (
        <SongBPM bpm={row.bpm} minBPM={row.minBPM} maxBPM={row.maxBPM} />
      )
    }
  },
  {
    title: t('columns.total'), key: "total", width: "175px", align: "center",
    render(row: SongData): VNode {
      return (
        <SongTotal notes={row.notes} total={row.total} />
      )
    }
  },
];

const pagination = reactive({
  page: 1,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
  onChange: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  }
});

async function loadData() {
  loading.value = true;
  try {
    const songs = await querySongsByEntryID(props.entryID);
    if (songs != null) {
      data.value = [...songs];
    }
  } finally {
    loading.value = false;
  }
}

watch(() => props.entryID, () => {
  loadData();
}, { immediate: true });
</script>
