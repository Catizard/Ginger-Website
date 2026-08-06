<!-- Render a chart's judge rank -->
<script setup lang="tsx">
import { computed, type VNode } from 'vue';
import type { TagColor } from './tag';
import { NTag } from "naive-ui";

const { judgeRank } = defineProps<{
  judgeRank: number,
}>();

type CommonJudge = "VERY-HARD" | "HARD" | "NORMAL" | "EASY" | "VERY-EASY" | "Unknown";

// NOTE: This logic is copied from beatoraja, which is not perfect, but usable at least
const commonJudgeRank = computed<CommonJudge>(() => {
  if (judgeRank == 0 || (judgeRank >= 10 && judgeRank < 35)) {
    return "VERY-HARD";
  } else if (judgeRank == 1 || (judgeRank >= 35 && judgeRank < 60)) {
    return "HARD";
  } else if (judgeRank == 2 || (judgeRank >= 60 && judgeRank < 85)) {
    return "NORMAL";
  } else if (judgeRank == 3 || (judgeRank >= 85 && judgeRank < 110)) {
    return "EASY";
  } else if (judgeRank == 4 || (judgeRank >= 110)) {
    return "VERY-EASY"
  }
  return "Unknown";
});

const render = (): VNode | null => {
  let color = {} as TagColor;
  switch (commonJudgeRank.value) {
    case "VERY-HARD": color = { color: "#C62828", textColor: "#FFFFFF" }; break;
    case "HARD": color = { color: "#E65100", textColor: "#FFFFFF" }; break;
    case "NORMAL": color = { color: "#1565C0", textColor: "#FFFFFF" }; break;
    case "EASY": color = { color: "#2E7D32", textColor: "#FFFFFF" }; break;
    case "VERY-EASY": color = { color: "#66BB6A", textColor: "#1E1E1E" }; break;
    case "Unknown": color = { color: "#E3E5E7", textColor: "#68717B", borderColor: "#68717B" }; break;
  }

  return (
    <NTag color={color} >
      {commonJudgeRank.value}
    </NTag>
  )
}
</script>

<template>
  <component :is="render" />
</template>
