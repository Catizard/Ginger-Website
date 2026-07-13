<!-- Edit a table category -->
<template>
  <n-modal :show="show" :loading="loading" preset="dialog" :title="t('title.editTableCategory')"
    :negativeText="t('button.cancel')" :positiveText="t('button.submit')" @negativeClick="() => show = false"
    @positiveClick="handleSubmit" @close="() => show = false">
    <n-form ref="formRef" v-model:value="modelRef">
      <n-form-item :label="t('form.name')">
        <n-input v-model:value="modelRef.name" />
      </n-form-item>
      <n-form-item :label="t('form.formIndex')">
        <n-input v-model:value="modelRef.orderIndex" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="tsx">
import { findCategoryByID, updateCategory, type UpdateTableCategoryVo } from '@/api/category';
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
const modelRef: Ref<UpdateTableCategoryVo> = ref({
  id: 0,
  name: "",
  orderIndex: -1,
});

async function open(categoryID: number) {
  modelRef.value.id = categoryID;
  show.value = true;
  loading.value = true;
  try {
    const category = await findCategoryByID(categoryID);
    modelRef.value.name = category.name;
    modelRef.value.orderIndex = category.orderIndex;
  } finally {
    loading.value = false;
  }
}

async function handleSubmit() {
  loading.value = true;
  try {
    await updateCategory(modelRef.value);
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
