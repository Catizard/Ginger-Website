<!-- 
  Renders a couple of tables configured in the system and a jump button, used as the
  navigation component for tables.
-->
<template>
  <TitleWithButtons :title="title">
    <n-button @click="handleClickSeeMore" type="primary">
      <n-icon :component="icons.forward" />
      {{ t('button.seeMore') }}
    </n-button>
  </TitleWithButtons>
  <TableCardsGrid :tables="tables" />
</template>

<script setup lang="tsx">
import TitleWithButtons from '@/components/TitleWithButtons.vue';
import TableCardsGrid from './TableCardsGrid.vue';
import type { TableHeader } from '@/api/table';
import { icons } from '@/utils/icons';
import router from "@/router";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  title: string,
  tables: TableHeader[],
  jumpType: "EVENT" | "TABLE"
}>();

function handleClickSeeMore() {
  router.push(`/download/select/${props.jumpType}`);
}
</script>
