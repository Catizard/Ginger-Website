<template>
  {{ t('event.createTable', { tableName: tableName }) }}
</template>

<script setup lang="tsx">
import type { EventLog } from '@/api/event';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { parsePayload, type TableCreateEvent } from './eventRenderer';

const props = defineProps<{
  event: EventLog
}>();

const { t } = useI18n();
const payload = computed((): TableCreateEvent => parsePayload(props.event));
const tableName = computed(() => payload.value.tableName)
</script>
