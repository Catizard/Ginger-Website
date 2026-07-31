<!-- Render a song's bpm, due to historical reasons, when bpm appears to 0
  it means this bpm is uncalculated or errored when parsing the sabun. In the
  meanwhile, this component should render an error flag that shows "this is
  abnormal" to hint the user
-->
<template>
  <n-text v-if="bpm == 0">
    /
  </n-text>
  <n-text v-else-if="bpm == minBPM && bpm == maxBPM">
    {{ bpm }}
  </n-text>
  <n-text v-else>
    {{ bpm }} ({{ minBPM }} ~ {{ maxBPM }})
  </n-text>
</template>

<script setup lang="tsx">
const { bpm, minBPM, maxBPM } = defineProps<{
  bpm: number,
  minBPM: number,
  maxBPM: number
}>();
</script>
