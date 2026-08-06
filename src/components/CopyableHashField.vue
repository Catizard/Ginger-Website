<!-- Render a hash text ellipsis itself when it's too long, with a copy button -->
<template>
  <n-flex align="center" :wrap="false">
    <n-ellipsis :style="{ maxWidth: props.maxWidth }">
      {{ props.hash }}
    </n-ellipsis>
    <n-button type="info" size="tiny" @click="copyTextToClipboard(props.hash)">
      <n-icon :component="icons.clipboard" />
    </n-button>
  </n-flex>
</template>

<script setup lang="tsx">
import { useI18n } from 'vue-i18n';
import { icons } from "@/utils/icons";

const props = defineProps<{
  hash: string,
  maxWidth: string,
}>();

const { t } = useI18n();

async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    window.$notifySuccess(t('dialog.copiedSuccessfully'));
  } catch (err) {
    console.error(err);
    window.$notifyError(t("dialog.copiedUnsuccessfully", { reason: err }));
  }
}
</script>
