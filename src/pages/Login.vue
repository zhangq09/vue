<template>
  <div class="login-page">
    <q-card class="login-from-content">
      <div class="title">音乐盒</div>
      <q-form class="q-gutter-md from" @submit="OnSubmit">
        <q-input
          rounded
          filled
          v-model="username"
          label="用户名:"
          hint="Name and surname"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '请输入账号']"
        />

        <q-input
          rounded
          filled
          type="password"
          v-model="password"
          label="密码:"
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || '请输入密码']"
        />

        <div class="rememberMe">
          <q-toggle v-model="accept" label="记住我的账号密码" />
        </div>

        <div>
          <q-btn
            label="Submit"
            class="full-width"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import router from '../router'
import { useRoute } from 'vue-router'

const username = ref('')
const password = ref('')
const accept = ref(false)
const store = useStore()
const route = useRoute()
const OnSubmit = () => {
  store
    .dispatch('user/login', {
      username: username.value.trim(),
      password: password.value,
    })
    .then(() => {
      store.dispatch('user/fetchCurrentUser').then(() => {
        router.push({ path: route.query.redirect || '/' })
      })
    })
}
</script>

<style scoped lang="less">
.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 40px;
    text-align: center;
    margin-bottom: 20px;
  }
  .login-from-content {
    width: 400px;
    padding: 10px;
    .from {
      width: 400px;
    }
  }
  .rememberMe {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .register {
    text-align: center;
    font-size: 12;
  }
}
</style>
