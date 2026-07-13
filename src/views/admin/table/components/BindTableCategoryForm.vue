<!-- Bind a table with a category, or unbind -->
<template>
  <n-modal :show="show" :loading="loading" preset="dialog" :title="t('title.bindCategoryToTable')"
    :negativeText="t('button.cancel')" :positiveText="t('button.submit')" @negativeClick="() => show = false"
    @positiveClick="handleSubmit" @close="() => show = false">
    <n-form ref="formRef" v-model:value="modelRef">
      <n-select :options="options" v-model:value="modelRef.categoryID" />
    </n-form>
  </n-modal>
</template>

<script setup lang="tsx">
import { bindCategoryToTable, selectCategoryList, type BindCategoryToTable } from '@/api/category';
import { NModal, NForm, NSelect, type FormInst, type SelectOption } from 'naive-ui';
import { ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  onSubmit?: () => void
}>();

const { t } = useI18n();

const show = ref(false);
const loading = ref(false);
const formRef: Ref<FormInst | null> = ref(null);
const modelRef: Ref<BindCategoryToTable> = ref({
  headerID: 0,
  categoryID: -1,
});

function open(headerID: number, categoryID: number) {
  modelRef.value.headerID = headerID;
  modelRef.value.categoryID = categoryID;
  show.value = true;
}

const options: Ref<SelectOption[]> = ref([]);
async function loadTags() {
  loading.value = true;
  try {
    const categories = await selectCategoryList({});
    options.value = [{
      label: "NULL",
      value: -1
    }];
    if (categories != null) {
      options.value.push(...categories.map(category => {
        return {
          label: category.name,
          value: category.id,
        } as SelectOption;
      }));
    }
  } finally {
    loading.value = false;
  }
}

async function handleSubmit() {
  loading.value = true;
  try {
    await bindCategoryToTable(modelRef.value);
    if (props.onSubmit != undefined) {
      props.onSubmit();
    }
  } finally {
    loading.value = false;
    show.value = false;
  }
}

loadTags();

defineExpose({ open });
</script>
