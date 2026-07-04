<template>
  <div class="search-bar">
    <n-input v-model:value="fuzzyKeyword" clearable class="search-input">
      <template #prefix>
        <n-icon>
        </n-icon>
        <SearchOutline />
      </template>
    </n-input>
  </div>

  <n-card class="download-card" :bordered="false">
    <FileDataTable :fuzzyKeyword="fuzzyKeyword" />
  </n-card>
</template>

<script setup lang="tsx">
import { NIcon } from 'naive-ui';
import { ref } from 'vue';
import { SearchOutline } from '@vicons/ionicons5';
import FileDataTable from './components/FileDataTable.vue';

const fuzzyKeyword = ref('');
</script>

<style scoped>
.download-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
  overflow: hidden;
}

:deep(.styled-table .n-data-table-th) {
  font-weight: 600;
  color: var(--n-text-color-base);
}

:deep(.styled-table .n-data-table-td) {
  padding: 12px 16px;
}

:deep(.n-data-table-wrapper) {
  border-radius: 8px;
}

:deep(.n-pagination) {
  padding: 12px 0;
}

.search-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  background: var(--n-color);
  border-bottom: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}

.search-input {
  border-radius: 8px;
}
</style>
