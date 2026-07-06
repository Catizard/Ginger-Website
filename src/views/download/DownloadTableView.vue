<template>
  <n-card class="table-detail-card" :bordered="false">
    <n-space style="margin-bottom: 20px;" align="center">
      <n-button round @click="router.back()">
        <template #icon>
          <n-icon>
            <ArrowBackOutline />
          </n-icon>
        </template>
        {{ t('button.back') }}
      </n-button>
      <n-divider vertical />
      <n-text strong style="font-size: 18px;">{{ currentTableName }}</n-text>
    </n-space>

    <n-flex horizontal :wrap="false">
      <n-radio-group v-model:value="viewingLevel">
        <n-radio-button value="package" default-checked>
          {{ "Package" }}
        </n-radio-button>
        <n-radio-button value="sabun">
          {{ "Sabun" }}
        </n-radio-button>
      </n-radio-group>
    </n-flex>

    <n-divider></n-divider>

    <FileDataTable v-if="viewingLevel == 'package'" :tableID="tableID" disableCard />
    <DifficultDataTable v-else :tableID="tableID" disableCard />
  </n-card>
</template>

<script setup lang="tsx">
import { NButton, NIcon, NText } from 'naive-ui';
import { computed, ref, type Ref, watch } from 'vue';
import { ArrowBackOutline } from '@vicons/ionicons5';
import { useI18n } from "vue-i18n";
import { useRoute } from 'vue-router';
import router from '@/router';
import FileDataTable from './components/FileDataTable.vue';
import { selectOneHeader, type TableHeader } from '@/api/table';
import DifficultDataTable from './components/DifficultDataTable.vue';


const { t } = useI18n();
const route = useRoute();

const tableID: Ref<number | null> = ref(null);

type ViewingLevel = "package" | "sabun";
const viewingLevel: Ref<ViewingLevel> = ref("package");

const currentTableHeader: Ref<TableHeader | null> = ref(null);

async function loadData() {
  const header = await selectOneHeader(tableID.value!!);
  currentTableHeader.value = header;
}

const currentTableName = computed(() => currentTableHeader.value?.name ?? "");

watch(() => route.params.id, (newValue) => {
  if (typeof newValue === "string") {
    const id = Number.parseInt(newValue);
    tableID.value = id;
    loadData();
  } else {
    throw "No id passed"
  }
}, { immediate: true })

</script>

<style scoped>
.table-detail-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
}

.styled-collapse {
  border-radius: 8px;
  overflow: hidden;
}

/* :deep(.n-collapse-item) { */
/*   border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06)); */
/*   margin-bottom: 12px; */
/*   border-radius: 8px !important; */
/*   overflow: hidden; */
/* } */

:deep(.n-collapse-item:last-child) {
  margin-bottom: 0;
}

/* :deep(.n-collapse .n-collapse-item .n-collapse-item__header) { */
/*   padding: 0px; */
/* } */

:deep(.n-collapse-item__header) {
  background: var(--n-color-modal, #fafafa);
}

/* :deep(.n-collapse-item__content__wrapper) { */
/*   padding: 16px; */
/* } */

/* :deep(.n-data-table-wrapper) { */
/*   border-radius: 8px; */
/* } */

.viewingPackageRadioGroup {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
