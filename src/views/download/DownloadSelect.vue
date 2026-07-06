<template>
  <n-collapse :expanded-names="expandedCategories" arrow-placement="right" @item-header-click="handleClickCategory">
    <n-collapse-item v-for="category in categories" :key="category.categoryName" :name="category.categoryName">
      <template #header>
        <n-h2 prefix="bar" type="primary" style="margin-bottom: 0;">
          {{ category.categoryName }}
        </n-h2>
      </template>
      <n-grid :cols="2" :x-gap="20" :y-gap="20">
        <n-grid-item v-for="table in category.tables" :key="table.id">
          <n-card hoverable :title="table.name" @click="handleClickTable(table.id)" class="table-card"
            :bordered="false">
            <template #header-extra>
              <n-flex vertical>
                <n-icon v-if="table.missingCount == 0 && table.dataCount != 0" :component="CheckmarkCircle" size="24"
                  color="#0E7A0D" />
                <n-tag v-else type="info" round size="small">
                  {{ ((table.dataCount - table.missingCount) * 100 / table.dataCount).toFixed(1) }}%
                </n-tag>
                <n-button v-if="table.selfhostFlag" size="tiny" @click.stop="handleCopyTableURL(table.id)">
                  Copy url
                </n-button>
              </n-flex>
            </template>
            <n-space vertical :size="8">
              <n-flex align="center">
                <!-- TODO: Fix the garbage data :( -->
                <!-- <n-icon :component="ListOutline" size="16" color="var(--n-text-color-3)" /> -->
                <!-- <n-text depth="3" style="font-size: 13px;">{{ t('difficultyLevel') }}: {{ table.levelOrders }}</n-text> -->
              </n-flex>
              <n-flex align="center">
                <n-icon :component="MusicalNotesOutline" size="16" color="var(--n-text-color-3)" />
                <n-text depth="3" style="font-size: 13px;">{{ t('misc.trackCount') }}: {{ table.dataCount }}</n-text>
              </n-flex>
            </n-space>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="ts">
import { selectHeaderList, type TableHeader, type TableType } from "@/api/table";
import { useI18n } from "vue-i18n";
import router from "@/router";
import { CheckmarkCircle, MusicalNotesOutline } from "@vicons/ionicons5"
import { ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";
import { NCollapse, NIcon } from "naive-ui";

const { t } = useI18n();
const route = useRoute();

interface TableCategory {
  categoryName: string,
  tables: TableHeader[]
}

const categories: Ref<TableCategory[]> = ref([]);
const expandedCategories: Ref<string[]> = ref([]);

async function loadTableList(queryType: TableType) {
  try {
    const headers = await selectHeaderList({ type: queryType });
    const sortedHeaders = headers.sort((lhs, rhs) => lhs.categoryName.localeCompare(rhs.categoryName));
    categories.value = [];
    for (let i = 0; i < sortedHeaders.length; ++i) {
      let j = i;
      while (j + 1 < sortedHeaders.length && sortedHeaders[i]?.categoryName == sortedHeaders[j + 1]?.categoryName) j++;
      const tables = [] as TableHeader[];
      for (let k = i; k <= j; ++k) tables.push(sortedHeaders[k]!);
      categories.value.push({
        categoryName: sortedHeaders[i]?.categoryName!,
        tables: tables,
      })
      i = j;
    }
    expandedCategories.value = categories.value.map(cat => cat.categoryName);
    console.log(expandedCategories.value);
  } catch (error) {
    console.error(error);
  }
}

function handleClickCategory({ name }: { name: string }) {
  const index = expandedCategories.value.findIndex(cat => cat == name)
  if (index == -1) {
    expandedCategories.value.push(name);
    return;
  }
  expandedCategories.value.splice(index, 1);
}

function handleClickTable(id: number) {
  router.push(`/download/table/${id}`);
}

function handleCopyTableURL(id: number) {
  const url = `https://gingerrush.com/api/v1/table/meta/header/${id}.json`
  navigator.clipboard.writeText(url);
}

watch(() => route.params.type, (queryType) => {
  if (queryType !== "TABLE" && queryType !== "EVENT") {
    console.error("Unexpected table query type: ", queryType);
    router.push("/404");
  }
  loadTableList(queryType as any);
}, { immediate: true });
</script>

<style scoped>
.table-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--n-border-color, rgba(0, 0, 0, 0.06));
  transition: all 0.2s ease;
  cursor: pointer;
}

.table-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

:deep(.n-tag) {
  justify-content: center;
}
</style>
