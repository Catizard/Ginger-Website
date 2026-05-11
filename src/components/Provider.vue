<template>
  <n-config-provider :hljs="hljs" :theme="theme" :theme-overrides="themeOverrides">
    <n-notification-provider>
      <n-modal-provider>
        <n-global-style />
        <n-loading-bar-provider>
          <n-message-provider>
            <n-dialog-provider>
              <slot />
            </n-dialog-provider>
          </n-message-provider>
        </n-loading-bar-provider>
      </n-modal-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, useOsTheme } from "naive-ui";
import { computed } from "vue";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json"
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage('json', json);
hljs.registerLanguage('javascript', javascript)

const osTheme = useOsTheme();
const theme = computed(() => (osTheme.value == "dark" ? darkTheme : null));

const themeOverrides = {
  common: {
    borderRadius: '10px',
    borderRadiusSmall: '6px',
  },
  Card: {
    borderRadius: '12px',
  },
  Button: {
    borderRadiusMedium: '8px',
    borderRadiusSmall: '6px',
  },
  Input: {
    borderRadius: '8px',
  },
  DataTable: {
    borderRadius: '8px',
  },
  Menu: {
    borderRadius: '8px',
  },
};
</script>
