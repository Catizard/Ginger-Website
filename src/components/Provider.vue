<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-notification-provider>
      <n-modal-provider>
        <n-global-style />
        <n-loading-bar-provider>
          <n-message-provider>
            <n-dialog-provider>
              <slot />
              <Message />
            </n-dialog-provider>
          </n-message-provider>
        </n-loading-bar-provider>
      </n-modal-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import Message from './Message.vue';

//const osTheme = useOsTheme();
//const theme = computed(() => (osTheme.value == "dark" ? darkTheme : null));

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
