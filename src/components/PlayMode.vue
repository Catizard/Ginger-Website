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

  // TODO: Render different color here
  console.log(pm);

  return (
    <NTag type="success">
      {pm}
    </NTag>
  );
}

</script>

<template>
  <component :is="render" />
</template>
