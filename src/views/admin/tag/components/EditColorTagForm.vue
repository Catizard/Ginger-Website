<!-- Edit one color tag -->
<template>
  <n-modal :show="show" :loading="loading" preset="dialog" :title="t('title.editColorTag')"
    :negativeText="t('button.cancel')" :positiveText="t('button.submit')" @negativeClick="() => show = false"
    @positiveClick="handleSubmit" @close="() => show = false">
    <n-form ref="formRef" v-model:value="modelRef">
      <n-form-item :label="t('form.name')">
        <n-input v-model:value="modelRef.tagName" />
      </n-form-item>
      <n-form-item :label="t('form.tagColor')">
        <n-color-picker modes="hex" v-model:value="modelRef.tagColor" />
      </n-form-item>
      <n-form-item :label="t('form.tagTextColor')">
        <n-color-picker modes="hex" v-model:value="modelRef.tagTextColor" />
      </n-form-item>
      <n-form-item :label="t('form.tagComment')">
        <n-input v-model:value="modelRef.tagComment" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="tsx">
import { findColorTagByID, updateColorTag, type UpdateColorTagVo } from '@/api/tags';
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
const modelRef: Ref<UpdateColorTagVo> = ref({
  id: 0,
  tagName: "",
  tagColor: "",
  tagTextColor: "",
  tagComment: "",
});

async function open(tagID: number) {
  modelRef.value.id = tagID;
  show.value = true;
  loading.value = true;
  try {
    const tag = await findColorTagByID(tagID);
    modelRef.value.tagName = tag.tagName;
    modelRef.value.tagColor = tag.tagColor;
    modelRef.value.tagTextColor = tag.tagTextColor;
    modelRef.value.tagComment = tag.tagComment;
  } finally {
    loading.value = false;
  }
}

async function handleSubmit() {
  loading.value = true;
  try {
    await updateColorTag(modelRef.value);
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
