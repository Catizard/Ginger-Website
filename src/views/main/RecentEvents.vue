<!-- An infinite scroll timeline that shows the recent events -->
<template>
  <n-timeline>
    <template v-for="item in items">
      <n-timeline-item v-if="item.kind == 'day'" :title="item.date" type="success" />
      <n-timeline-item v-else type="info">
        <template #header>
          <n-flex align="center">
            <AdminAvatar :admin="item.createUser" />
            <n-text strong bold>
              {{ item.createUser }}
            </n-text>
            {{ item.desc }}
          </n-flex>
        </template>
      </n-timeline-item>
    </template>
  </n-timeline>
</template>

<script setup lang="tsx">
import { EventLogType, selectDaySections, toEventLogType } from '@/api/event'; import AdminAvatar from '@/components/AdminAvatar.vue';

import { ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

type Item = DayItem | GroupItem;

interface DayItem {
  kind: 'day',
  date: string,
}

interface GroupItem {
  kind: 'group',
  desc: string,
  count: number,
  aggregatable: boolean,
  createUser: string,
  eventType: string,
  payload: string,
}

const { t } = useI18n();
const loading = ref(false);

const items: Ref<Item[]> = ref([]);
const nextCursor: Ref<string | null> = ref(null);
const hasMore = ref(true);

async function loadData() {
  loading.value = true;
  try {
    const ret = await selectDaySections({
      beforeDate: nextCursor.value,
      limitDays: 7,
    });

    nextCursor.value = ret.nextCursor;
    hasMore.value = ret.hasMore;

    items.value = [...ret.days.flatMap(it => {
      return [
        {
          kind: "day",
          date: it.date,
          label: "",
        } as DayItem,
        ...it.groups.map(gr => {
          let groupItem = {
            kind: "group",
            count: gr.count,
            aggregatable: gr.aggregatable,
            createUser: gr.createUser,
            eventType: gr.eventType,
            payload: gr.payload
          } as GroupItem;

          const evt = toEventLogType(groupItem.eventType);
          if (evt == EventLogType.MANUAL_NOTE) {
            groupItem.desc = t('event.desc.manualNote', { message: gr.payload });
          } else if (evt == EventLogType.UPLOAD_PACKAGE) {
            groupItem.desc = t('event.desc.uploadPackage', { count: gr.count });
          } else if (evt == EventLogType.DELETE_PACKAGE) {
            groupItem.desc = t('event.desc.deletePackage', { count: gr.count });
          }

          return groupItem;
        })
      ] as Item[];
    })];

    console.log(items.value);
  } finally {
    loading.value = false;
  }
}

loadData();
</script>
