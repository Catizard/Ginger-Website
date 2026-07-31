<!-- Render a sabun's total, the total value passed in could be 0,
  which indicates this sabun is unparsed or parsed wrongly -->
<template>
  <template v-if="total == 0">
    /
  </template>
  <template v-else>
    <n-flex vertical>
      <n-text strong>
        {{ total }}
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
}>();
</script>
