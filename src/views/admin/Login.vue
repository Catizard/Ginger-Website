<template>
  <n-flex vertical justify="center" align="center" style="height: 100vh">
    <n-flex horizontal align="center">
      <n-card>
        <n-form ref="formRef" :model="modelRef" :rules="rules">
          <n-form-item path="account" label="account">
            <n-input v-model:value="modelRef.account" />
          </n-form-item>
          <n-form-item path="password" label="password">
            <n-input v-model:value="modelRef.password" type="password" />
          </n-form-item>
        </n-form>
        <n-flex>
          <n-button @click="handleClickBack">Back</n-button>
          <n-button type="primary" @click="handleClickLogin">Login</n-button>
        </n-flex>
      </n-card>
    </n-flex>
  </n-flex>
</template>

<script setup lang="tsx">
import type { AdminUser } from "@/api/admin";
import { NFlex, NCard, NForm, NFormItem, NInput, NButton, type FormInst, type FormRules } from "naive-ui";
import { ref, type Ref } from "vue";
import { login } from "@/api/admin";
import router from "@/router";

const formRef: Ref<FormInst | null> = ref(null);

const modelRef: Ref<AdminUser> = ref({
  account: null,
  password: null
} as AdminUser);

const rules: FormRules = {
  account: [
    {
      required: true,
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      trigger: "blur"
    }
  ]
};

function handleClickBack() {
  router.push("/");
}

async function handleClickLogin() {
  try {
    const result = await login(modelRef.value);
    localStorage.setItem("ginger_admin_token", result);
    router.push("/admin/table/manage");
  } catch (err) {
    console.error(err);
  }
}
</script>
