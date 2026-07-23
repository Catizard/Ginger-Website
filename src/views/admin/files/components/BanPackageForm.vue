<!-- A form that sends a request to ban a package on server -->
<template>
  <n-modal :show="show" :loading="loading" preset="dialog" :title="t('title.banPackage')"
    :negativeText="t('button.cancel')" :positiveText="t('button.submit')" @negativeClick="() => show = false"
    @positiveClick="handleSubmit" @close="() => show = false">
    <n-form ref="formRef" v-model:value="modelRef">
      <n-form-item :label="t('form.bannedReason')">
        <n-input v-model:value="modelRef.bannedReason" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="tsx">
import { banPackage, type BanPackageVo } from '@/api/files';
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
const modelRef: Ref<BanPackageVo> = ref({
  id: 0,
  bannedReason: "",
});

async function open(tagID: number) {
  modelRef.value.id = tagID;
  show.value = true;
}

async function handleSubmit() {
  loading.value = true;
  try {
    await banPackage(modelRef.value);
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
