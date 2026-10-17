<template>
  <template>
    {{ event.payload }}
  </template>
</template>

<script setup lang="tsx">
import type { EventLog } from '@/api/event';

const props = defineProps<{
  event: EventLog,
}>();
</script>
