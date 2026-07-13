<!-- Edit a table header -->
<template>
  <n-modal :show="show" :loading="loading" preset="dialog" :title="t('title.editTableHeader')"
    :negativeText="t('button.cancel')" :positiveText="t('button.submit')" @negativeClick="() => show = false"
    @positiveClick="handleSubmit" @close="() => show = false">
    <n-form ref="formRef" v-model:value="modelRef">
      <n-form-item :label="t('form.name')">
        <n-input v-model:value="modelRef.name" />
      </n-form-item>
      <n-form-item :label="t('form.symbol')">
        <n-input v-model:value="modelRef.symbol" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="tsx">
import { selectOneHeader, updateTableHeader, type UpdateTableHeaderVo } from '@/api/table';
import { NModal, NForm, NFormItem, type FormInst } from 'naive-ui';
import { ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  onSubmit?: () => void
}>();

const { t } = useI18n();

const show = ref(false);
const loading = ref(false);
const formRef: Ref<FormInst | null> = ref(null);
const modelRef: Ref<UpdateTableHeaderVo> = ref({
  id: 0,
  name: "",
  categoryID: -1,
  symbol: "",
});

async function open(headerID: number) {
  modelRef.value.id = headerID;
  show.value = true;
  loading.value = true;
  try {
    const header = await selectOneHeader(headerID);
    modelRef.value.name = header.name;
    modelRef.value.categoryID = header.categoryID;
    modelRef.value.symbol = header.symbol;
  } finally {
    loading.value = false;
  }
}

async function handleSubmit() {
  loading.value = true;
  try {
    await updateTableHeader(modelRef.value);
    if (props.onSubmit != undefined) {
      props.onSubmit();
    }
  } finally {
    loading.value = false;
    show.value = false;
  }
}

defineExpose({ open });
</script>
