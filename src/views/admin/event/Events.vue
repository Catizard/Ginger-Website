<template>
  <TitleWithButtons :title="t('title.admin.events')">
    <n-button @click="handleClickPublishEvent" type="primary">
      <n-icon :component="icons.add" />
      {{ t('button.publish') }}
    </n-button>
  </TitleWithButtons>
  <!-- Search Area -->
  <n-flex gap="8" vertical>
  </n-flex>

  <n-card style="margin-top: 8px">
    <!-- Table Area -->
    <n-data-table remote :loading="loading" :columns="columns" :data="data" :pagination="pagination"
      :row-key="(row: EventLog) => row.id" />
  </n-card>
  <PublishEventForm ref="publishEventFormRef" @submit="loadData" />
</template>

<script setup lang="tsx">
import { selectEventLogs, type EventLog, type QueryEventLogVo } from '@/api/event';
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import type { DataTableColumns } from 'naive-ui';
import { ref, type Ref, type VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import { NFlex, NTime } from "naive-ui";
import { createPagination } from '@/utils/page';
import { icons } from "@/utils/icons";
import PublishEventForm from './PublishEventForm.vue';
import EventLogEntry from './EventLogEntry.vue';
import AdminAvatar from '@/components/AdminAvatar.vue';

const { t } = useI18n();
const publishEventFormRef: Ref<InstanceType<typeof PublishEventForm> | null> = ref(null);

const loading = ref(false);
let data: Ref<EventLog[]> = ref([]);
const pagination = createPagination(loadData);

const columns: DataTableColumns<EventLog> = [
  {
    type: "expand",
    renderExpand(row: EventLog) {
      return <EventLogEntry event={row} />
    }
  },
  { title: t('columns.type'), key: "eventType", },
  {
    title: t('columns.createUser'), key: "createUser",
    render(row: EventLog): VNode {
      return (
        <NFlex align="center">
          <AdminAvatar admin={row.createUser} />
          {row.createUser}
        </NFlex>
      )
    }
  },
  {
    title: t('columns.time'), key: "createTime",
    render(row: EventLog): VNode {
      return (
        <NTime time={row.createTime} unix />
      )
    },
  }
];

function loadData() {
  let query: QueryEventLogVo = {
    pageRequest: {
      page: pagination.page!!,
      pageSize: pagination.pageSize!!
    }
  };

  loading.value = true;

  selectEventLogs(query)
    .then(result => {
      if (result.data != null) {
        pagination.pageCount = result.pageCount;
        data.value = [...result.data];
      }
    }).finally(() => loading.value = false);
}

function handleClickPublishEvent() {
  publishEventFormRef?.value?.open();
}

loadData();
</script>
