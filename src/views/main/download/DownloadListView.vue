<template>
  <!-- File table area   -->
  <FileDataTable />

  <!-- Welcome -->
  <WelcomeCard style="margin-top: 32px;" />

  <!-- Commonly used tables -->
  <div style="margin-top: 32px;" v-if="specialTables.length > 0">
    <SpecialTables jumpType="TABLE" :tables="specialTables" :title="t('title.specialTables')" />
  </div>
  <!-- Recent Events -->
  <div style="margin-top: 32px;" v-if="specialEvents.length > 0">
    <SpecialTables jumpType="EVENT" :tables="specialEvents" :title="t('title.specialEvents')" />
  </div>

  <!-- Foot -->
  <div style="margin-top: 32px;">
    <Contributors />
  </div>
</template>

<script setup lang="tsx">
import { ref, type Ref } from 'vue';
import FileDataTable from './components/FileDataTable.vue';
import WelcomeCard from './components/WelcomeCard.vue';
import type { TableHeader } from '@/api/table';
import { selectSpecialTableListWithFullInfo } from '@/api/specialTable';
import { useI18n } from 'vue-i18n';
import SpecialTables from './components/SpecialTables.vue';
import Contributors from './components/Contributors.vue';

const { t } = useI18n();

const specialTables: Ref<TableHeader[]> = ref([]);
const specialEvents: Ref<TableHeader[]> = ref([]);

async function loadSpecialTables() {
  const allSpecialTables = await selectSpecialTableListWithFullInfo({});
  specialTables.value = [...allSpecialTables.filter(st => st.type == "TABLE")];
  specialEvents.value = [...allSpecialTables.filter(st => st.type == "EVENT")];
}

loadSpecialTables();
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
