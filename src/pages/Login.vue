<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="用户名:"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '请输入账号']"
      />

      <q-input
        filled
        type="number"
        v-model="age"
        label="密码:"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || '请输入账密码',
          (val) => (val > 0 && val < 100) || '请输入合适的密码',
        ]"
      />

      <q-toggle v-model="accept" label="记住我的账号密码" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'

const name = ref('')
const accept = ref(false)
</script>

<style scoped></style>
