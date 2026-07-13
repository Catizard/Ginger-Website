<template>
  <FileDataTable />
</template>

<script setup lang="tsx">
import FileDataTable from './components/FileDataTable.vue';

</script>

<style scoped>
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
</style>
