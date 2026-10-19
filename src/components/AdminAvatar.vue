<!-- Render admin's avatar; Yeah I know this strategy is cursed, it's just simple than storing the base64 data -->
<template>
  <n-avatar round size="small" :src="avatarURL" />
</template>

<script setup lang="tsx">
import { computed } from 'vue';

const props = defineProps({
  admin: String,
});

const adminAvatars = [
  { name: "Catizard", avatarURL: "https://github.com/Catizard.png" },
  { name: "Yuntian52", avatarURL: "https://github.com/Yuntian52s.png" }
];

const avatarURL = computed(() => adminAvatars.find(it => it.name == props.admin)?.avatarURL);
</script>
