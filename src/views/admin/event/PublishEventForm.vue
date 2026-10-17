<!-- Publish an event by admin -->
<template>
  <n-modal :show="show" :loading="loading" preset="dialog" :title="t('title.admin.publishEvent')"
    :negativeText="t('button.cancel')" :positiveText="t('button.submit')" @negativeClick="() => show = false"
    @positiveClick="handleSubmit" @close="() => show = false">
    <n-form ref="formRef" v-model:value="modelRef">
      <n-form-item :label="t('form.message')">
        <n-input v-model:value="modelRef.message" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script lang="tsx" setup>
import { publishEvent } from '@/api/event';
import type { FormInst } from 'naive-ui';
import { ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  onSubmit?: () => void
}>();

const { t } = useI18n();
const show = ref(false);
const loading = ref(false);

const formRef: Ref<FormInst | null> = ref(null);

interface Model {
  message: string,
}
const modelRef: Ref<Model> = ref({
  message: "",
});

function open() {
  modelRef.value.message = "";
  show.value = true;
}

async function handleSubmit() {
  try {
    await publishEvent({
      message: modelRef.value.message
    });
    if (props.onSubmit != null) {
      props.onSubmit();
    }
  } finally {
    show.value = false;
  }
}

defineExpose({ open });
</script>
