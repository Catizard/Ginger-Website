<!-- Render a sabun's total, the total value passed in could be 0,
  which indicates this sabun is unparsed or parsed wrongly -->
<template>
  <template v-if="total == 0">
    /
  </template>
  <template v-else>
    <n-flex :wrap="false">
      <n-text strong>
        {{ total }}
      </n-text>
      <n-text v-if="notes != 0">
        ({{ (total / notes).toFixed(2) }}/note)
      </n-text>
      <n-text teritry>
        {{ totalType }}
      </n-text>
    </n-flex>
  </template>
</template>

<script setup lang="tsx">
const { total, totalType } = defineProps<{
  total: number,
  totalType: string,
  notes: number
}>();
</script>
