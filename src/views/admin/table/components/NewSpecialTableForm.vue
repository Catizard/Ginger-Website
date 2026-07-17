<!-- Create a new special table -->
<template>
  <n-modal :show="show" :loading="loading" preset="dialog" :title="t('title.newSpecialTable')"
    :negativeText="t('button.cancel')" :positiveText="t('button.submit')" @negativeClick="() => show = false"
    @positiveClick="handleSubmit" @close="() => show = false">
    <n-form ref="formRef" v-model:value="modelRef">
      <n-select :options="tableOptions" v-model:value="modelRef.headerID" />
    </n-form>
  </n-modal>
</template>

<script setup lang="tsx">
import { insertSpecialTable, type InsertSpecialTableVo } from '@/api/specialTable';
import { selectHeaderList } from '@/api/table';
import { NModal, NForm, type FormInst, type SelectOption } from 'naive-ui';
import { ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  onSubmit?: () => void
}>();

const { t } = useI18n();

const show = ref(false);
const loading = ref(false);
const formRef: Ref<FormInst | null> = ref(null);
const modelRef: Ref<InsertSpecialTableVo> = ref({
  headerID: 0,
});

async function open() {
  console.log('open')
  show.value = true;
  await loadHeaders();
}

async function handleSubmit() {
  loading.value = true;
  try {
    await insertSpecialTable(modelRef.value);
    if (props.onSubmit != undefined) {
      props.onSubmit();
    }
  } finally {
    loading.value = false;
    show.value = false;
  }
}

const tableOptions: Ref<SelectOption[]> = ref([]);
async function loadHeaders() {
  loading.value = true;
  try {
    const headers = await selectHeaderList({});
    tableOptions.value = [...headers.map(header => {
      return {
        label: header.name,
        value: header.id
      } as SelectOption
    })];
    if (tableOptions.value.length != 0) {
      modelRef.value.headerID = tableOptions.value[0]?.value as number;
    }
  } finally {
    loading.value = false;
  }
}

defineExpose({ open });
</script>
