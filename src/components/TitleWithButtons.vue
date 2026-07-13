<!-- Renders a title and preserve an area for buttons at the end -->
<template>
  <n-flex justify="space-between">
    <n-h1 prefix="bar">
      <n-text type="primary">
        {{ title }}
      </n-text>
    </n-h1>
    <n-flex justify="end" align="center">
      <slot />
    </n-flex>
  </n-flex>
</template>

<script setup lang="tsx">
import { NText, NH1, NFlex } from "naive-ui";
const props = defineProps<{
  title: string,
}>()
</script>
