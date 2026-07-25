<!-- Show the reconcile runs on the server -->
<template>
  <TitleWithButtons :title="t('title.reconcileRuns')" />
  <n-data-table remote :loading="loading" :data="data" :columns="columns" :pagination="pagination" />
</template>

<script setup lang="tsx">
import { NText, NTime, type DataTableColumns } from 'naive-ui';
import { ref, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import { createPagination } from '@/utils/page';
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import { selectReconcileRunList, type ReconcileRun } from '@/api/reconcile';
import humanizeDuration from 'humanize-duration';

const { t } = useI18n();

const loading = ref(false);
const data: Ref<ReconcileRun[]> = ref([]);
const columns: DataTableColumns<ReconcileRun> = [
  {
    title: t('columns.type'), key: "type",
  },
  {
    title: t('columns.startAt'), key: "startAt",
    render(row: ReconcileRun): VNode {
      return (
        <NTime time={row.startAt} unix />
      )
    }
  },
  {
    title: t('columns.endAt'), key: "endAt",
    render(row: ReconcileRun): VNode {
      if (row.endAt == null) { return (<>/</>) }
      return (
        <NTime time={row.endAt} unix />
      )
    }
  },
  {
    title: t('columns.elapsedTime'), key: "elapsedTime",
    render(row: ReconcileRun): VNode {
      if (row.elapsedTime == null) {
        return (<>/</>)
      }
      console.log(row.elapsedTime);
      return (
        <NText>
          {humanizeDuration(row.elapsedTime)}
        </NText>
      )
    }
  },
];
const pagination = createPagination(loadData);

function loadData() {
  loading.value = true;
  selectReconcileRunList({
    pageRequest: {
      page: pagination.page!!,
      pageSize: pagination.pageSize!!
    }
  }).then(result => {
    if (result.data != null) {
      pagination.pageCount = result.pageCount;
      data.value = [...result.data];
      console.log(data.value);
    }
  }).finally(() => loading.value = false);
}

loadData();
</script>
