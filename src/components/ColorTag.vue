<!-- Render a tag component -->
<script lang="tsx" setup>
import { NTag } from 'naive-ui';
import type { TagColor } from 'naive-ui/es/tag/src/common-props';
import { h, type VNode } from 'vue';

const props = defineProps<{
  name: string,
  color?: string | null,
  textColor?: string | null,
  comment?: string | null
}>();

const render = (): VNode => {
  let color: TagColor = {};
  if (props.color) {
    color.color = props.color;
  }
  if (props.textColor) {
    color.textColor = props.textColor;
  }

  return h(
    NTag,
    { color: color },
    { default: () => props.name },
  )
};
</script>

<template>
  <render />
</template>
