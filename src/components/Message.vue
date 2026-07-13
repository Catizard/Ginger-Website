<script lang="ts">
import { createDiscreteApi } from 'naive-ui';
import './message.d.ts';
import { defineComponent } from 'vue';

const { notification } = createDiscreteApi(
  ['notification'],
);


window.$notification = notification;
function createNotification(type: "info" | "default" | "error" | "warning" | "success", content: string, duration: number, keepAliveOnHover: boolean) {
  window.$notification.create({
    type: type,
    content: content,
    duration: duration,
    keepAliveOnHover: keepAliveOnHover,
  })
}
window.$notifyDefault = (content: string, duration: number = 3000, keepAliveOnHover: boolean = true) => {
  createNotification("default", content, duration, keepAliveOnHover);
};
window.$notifyInfo = (content: string, duration: number = 3000, keepAliveOnHover: boolean = true) => {
  createNotification("info", content, duration, keepAliveOnHover);
};
window.$notifyWarning = (content: string, duration: number = 3000, keepAliveOnHover: boolean = true) => {
  createNotification("warning", content, duration, keepAliveOnHover);
};
window.$notifySuccess = (content: string, duration: number = 3000, keepAliveOnHover: boolean = true) => {
  createNotification("success", content, duration, keepAliveOnHover);
};
window.$notifyError = (content: string | Error, duration: number = 3000, keepAliveOnHover: boolean = true) => {
  if (content instanceof Error) {
    content = String(content);
  }
  createNotification("error", content, duration, keepAliveOnHover);
};


export default defineComponent({});
</script>


<template></template>
