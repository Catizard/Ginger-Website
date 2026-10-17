<template>
  {{ t('event.uploadPackage', { "fileName": fileName }) }}
</template>

<script setup lang="ts">
import type { EventLog } from '@/api/event';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { parsePayload, type PackageUploadEvent } from './eventRenderer';

const props = defineProps<{
  event: EventLog,
}>();

const { t } = useI18n();
const payload = computed((): PackageUploadEvent => parsePayload((props.event)));
const fileName = computed(() => payload.value.fileName);
</script>
