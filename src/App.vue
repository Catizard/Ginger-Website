<template>
  <Provider>
    <Viewer />
  </Provider>
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue';
import { Provider, Viewer } from './components';

onErrorCaptured(err => {
  console.error('global error: ', err);
})
</script>
