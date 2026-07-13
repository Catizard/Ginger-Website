<!-- Bind a table with a color tag, or unbind -->
<template>
  <n-modal :show="show" :loading="loading" preset="dialog" :title="t('title.bindTagToTable')"
    :negativeText="t('button.cancel')" :positiveText="t('button.submit')" @negativeClick="() => show = false"
    @positiveClick="handleSubmit" @close="() => show = false">
    <n-form ref="formRef" v-model:value="modelRef">
      <n-select :options="options" v-model:value="modelRef.tagID" />
    </n-form>
  </n-modal>
</template>

<script setup lang="tsx">
import { bindTagToTable, selectColorTagList, type BindTagToTableVo } from '@/api/tags';
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
const modelRef: Ref<BindTagToTableVo> = ref({
  headerID: 0,
  tagID: -1,
});

function open(headerID: number, tagID: number) {
  modelRef.value.headerID = headerID;
  modelRef.value.tagID = tagID;
  show.value = true;
}

const options: Ref<SelectOption[]> = ref([]);
async function loadTags() {
  loading.value = true;
  try {
    const tags = await selectColorTagList({});
    if (tags != null) {
      options.value = [{
        label: "NULL",
        value: -1
      }];
      options.value.push(...tags.map(tag => {
        return {
          label: tag.tagName,
          value: tag.id,
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
    await bindTagToTable(modelRef.value);
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
