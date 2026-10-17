<template>
  {{ message }}
</template>

<script setup lang="tsx">
import type { EventLog } from '@/api/event';
import { computed } from 'vue';

const props = defineProps<{
  event: EventLog
}>();

const message = computed(() => props.event.payload);
</script>
