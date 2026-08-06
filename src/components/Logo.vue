<!-- Render the logo image for the sidebar -->
<template>
  <div v-if="collapsed == true" class="logo" @click="handleClickLogo">
    <img src="/gingerrush-logo.png" alt="Ginger Rush" class="logo-img-collasped" />
  </div>
  <div v-else class="logo" @click="handleClickLogo">
    <img src="/gingerrush-title+logo.png" alt="Ginger Rush" class="logo-img-no-collapsed" />
  </div>
</template>

<script setup lang="ts">
const { collapsed } = defineProps<{
  collapsed: boolean,
}>();

function handleClickLogo() {

}
</script>

<style lang="css" scoped>
.logo {
  border-bottom: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.logo:hover {
  background-color: var(--n-color-hover, rgba(0, 0, 0, 0.02));
}

.logo-img-collasped {
  max-width: 100%;
  height: auto;
  max-height: 24px;
}

.logo-img-no-collapsed {
  max-width: 100%;
  height: auto;
  max-height: 48px;
}
</style>
