<template>
  <n-collapse :expanded-names="expandedCategories" arrow-placement="right" @item-header-click="handleClickCategory">
    <n-collapse-item v-for="category in categories" :key="category.categoryName" :name="category.categoryName">
      <template #header>
        <n-h2 prefix="bar" type="primary" style="margin-bottom: 0;">
          {{ category.categoryName }}
        </n-h2>
      </template>
      <TableCardsGrid :tables="category.tables" />
    </n-collapse-item>
  </n-collapse>
</template>

<script setup lang="ts">
import { selectHeaderListWithFullInfo, type TableHeader, type TableType } from "@/api/table";
import router from "@/router";
import { ref, watch, type Ref } from "vue";
import { useRoute } from "vue-router";
import { NCollapse } from "naive-ui";
import TableCardsGrid from "./components/TableCardsGrid.vue";

const route = useRoute();

interface TableCategory {
  categoryName: string,
  tables: TableHeader[]
}

const categories: Ref<TableCategory[]> = ref([]);
const expandedCategories: Ref<string[]> = ref([]);

async function loadTableList(queryType: TableType) {
  try {
    const headers = await selectHeaderListWithFullInfo({ type: queryType });
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

watch(() => route.params.type, (queryType) => {
  if (queryType !== "TABLE" && queryType !== "EVENT") {
    console.error("Unexpected table query type: ", queryType);
    router.push("/404");
  }
  loadTableList(queryType as any);
}, { immediate: true });
</script>

<style scoped>
:deep(.n-tag) {
  justify-content: center;
}
</style>
