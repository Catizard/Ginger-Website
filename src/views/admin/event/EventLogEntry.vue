<!-- The shell of the event logs -->
<template>
  <div class="event-entry">
    <component :is="renderer" :event="event" />
  </div>
</template>

<script setup lang="tsx">
import type { EventLog } from '@/api/event';
import { computed } from 'vue';
import { getRenderer } from './renderers/eventRenderer';

const props = defineProps<{
  event: EventLog
}>();

const renderer = computed(() => getRenderer(props.event.eventType));
</script>
