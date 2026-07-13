<!-- Create a new color tag -->
<template>
  <n-modal :show="show" :loading="loading" preset="dialog" :title="t('title.newColorTag')"
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
import { insertColorTag, type InsertColorTagVo } from '@/api/tags';
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
const modelRef: Ref<InsertColorTagVo> = ref({
  tagName: "",
  tagColor: "",
  tagTextColor: "",
  tagComment: "",
});

function open() {
  show.value = true;
}

async function handleSubmit() {
  loading.value = true;
  try {
    await insertColorTag(modelRef.value);
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
