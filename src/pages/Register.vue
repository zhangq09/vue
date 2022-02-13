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
          hint="用户名不能为空"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '请输入用户名']"
        />

        <q-input
          rounded
          filled
          v-model="nickname"
          label="昵称:"
          hint="昵称不能为空"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '请输入昵称']"
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
        <div class="split">
          <q-select
            filled
            rounded
            v-model="gender"
            :options="options"
            label="性别"
            color="teal"
            clearable
            options-selected-class="text-deep-orange"
            :style="isAdmin === true ? isStyle : notStyle"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption>{{
                    scope.opt.description
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            rounded
            filled
            v-model="roles"
            multiple
            :options="roleOptions"
            label="权限"
            style="width: 200px; padding: 5px"
            v-show="isAdmin"
          />
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
import { createUser } from '../api/user'

const options = [
  {
    label: '男',
    value: 'MALE',
    description: '男生哦~',
    icon: 'male',
  },
  {
    label: '女',
    value: 'FEMALE',
    description: '女神哦~',
    icon: 'female',
  },
  {
    label: '保密',
    value: 'UNKNOWN',
    description: '秘密哦~',
    icon: 'question_mark',
  },
]
const roleOptions = [
  { label: '普通用户', value: 'ROLE_USER' },
  { label: '会员用户', value: 'ROLE_USER_ADMIN' },
]
const gender = ref(null)
const password = ref('')
const username = ref('')
const nickname = ref('')
const roles = ref([])
const isAdmin = false
const OnSubmit = () => {
  new Promise((resolve, reject) => {
    if (isAdmin === false) {
      roles.value.unshift('ROLE_USER')
    }
    createUser({ username, nickname, password, gender, roles })
      .then((data) => {
        console.log('创建成功===>', data)
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
const isStyle = 'width: 200px; padding: 5px'
const notStyle = 'width: 400px; padding: 5px'
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
  .split {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>