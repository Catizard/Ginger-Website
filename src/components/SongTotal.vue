<!-- Render a sabun's total, the total value passed in could be 0,
  which indicates this sabun is unparsed or parsed wrongly -->
<template>
  <template v-if="total == 0">
    /
  </template>
  <template v-else>
    <n-flex :wrap="false" justify="center">
      <n-text strong>
        {{ total }}({{ notes != 0 ? `${(total / notes).toFixed(2)}/notes` : "/" }})
      </n-text>
    </n-flex>
  </template>
</template>

<script setup lang="tsx">
const { total, notes } = defineProps<{
  total: number,
  notes: number
}>();
</script>
