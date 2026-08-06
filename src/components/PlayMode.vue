<!-- Render a simple colored tag to represent the play mode of a chart,
  it's possible to make this configurable but currently this solution works fine.
  Also, the mode passed could be wrong/not exists, this component should render
  a flag indicates this case.
-->
<script setup lang="tsx">
import type { PlayModeType } from '@/api/songs';
import { computed } from 'vue';
import { toPlayModeType } from '@/api/songs';
import { NTag } from 'naive-ui';

export interface TagColor {
  color?: string;
  borderColor?: string;
  textColor?: string;
}

const { mode: orgMode } = defineProps<{
  mode: string
}>();

const mode = computed<PlayModeType | null>(() => {
  return toPlayModeType(orgMode);
});

const render = () => {
  const pm: PlayModeType | null = mode.value;

  if (pm == null) {
    return (<>/</>)
  }

  let color = {} as TagColor;
  switch (pm) {
    case "BEAT_5K":
    case "POPN_5K":
      color = { color: "#F6C2C5", textColor: "#8E4A53", borderColor: "#8E4A53" };
      break;
    case "BEAT_7K": color = { color: "#C5E7D0", textColor: "#47755A", borderColor: "#47755A" }; break;
    case "POPN_9K": color = { color: "#F1E7B4", textColor: "#7B6A33", borderColor: "#8E4A53" }; break;
    case "BEAT_10K": color = { color: "#F6D7B3", textColor: "#8B6039", borderColor: "#8B6039" }; break;
    case "BEAT_14K": color = { color: "#C4D8EC", textColor: "#3E6387", borderColor: "#3E6387" }; break;
    default: color = { color: "#E3E5E7", textColor: "#68717B", borderColor: "#68717B" }
  }

  return (
    <NTag type="success" color={color}>
      {pm}
    </NTag>
  );
}

</script>

<template>
  <component :is="render" />
</template>
