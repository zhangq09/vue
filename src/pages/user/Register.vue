<template>
  <q-btn
    color="primary"
    label="点我添加用户"
    style="margin-bottom: 5px"
    @click="inception = true"
  ></q-btn>
  <q-dialog v-model="inception">
    <div class="login-page">
      <q-card class="login-from-content">
        <q-parallax
          src="https://cdn.quasar.dev/img/parallax1.jpg"
          :height="100"
        />
        <q-form class="q-gutter-md from" @submit="OnSubmit">
          <q-input
            v-model="user.username"
            label="用户名:"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '请输入用户名']"
            style="padding: 10px; height: 50px"
          />

          <q-input
            v-model="user.nickname"
            label="昵称:"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '请输入昵称']"
            style="padding: 10px; height: 50px"
          />

          <q-input
            type="password"
            v-model="user.password"
            label="密码:"
            lazy-rules
            :rules="[(val) => (val !== null && val !== '') || '请输入密码']"
            style="padding: 10px; height: 50px"
          />
          <div class="split">
            <q-select
              v-model="user.gender"
              :options="options"
              label="性别"
              color="teal"
              clearable
              options-selected-class="text-deep-orange"
              style="width: 200px; height: 50px; padding: 10px"
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
              v-model="user.roles"
              multiple
              :options="roleOptions"
              label="权限"
              style="width: 200px; height: 50px; padding: 10px"
            />
          </div>

          <q-card-actions align="center" class="text-primary">
            <q-btn label="Submit" type="submit" flat />
            <q-btn flat label="Close" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-dialog>
  <q-dialog
    v-model="secondDialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">创建成功!</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        用户已成功创建,开启你的征程吧~
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="立即登录" @click="goLogin" />
        <q-btn
          flat
          label="返回"
          @click="
            () => {
              user.gender = null
              user.username = ''
              user.nickname = ''
              user.password = ''
              user.roles = []
              secondDialog = !secondDialog
            }
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { createUser } from '../../api/user.js'
import store from '../../store'
import router from '../../router'
export default {
  setup() {
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
    const user = reactive({
      gender: null,
      username: '',
      nickname: '',
      password: '',
      roles: [],
    })
    const secondDialog = ref(false)
    const inception = ref(false)
    const OnSubmit = () => {
      new Promise((resolve, reject) => {
        createUser({
          username: user.username,
          nickname: user.nickname,
          password: user.password,
          gender: user.gender.value,
          roles: user.roles.map((r) => {
            return r.value
          }),
        })
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      }).then(() => {
        secondDialog.value = true
      })
    }
    const goLogin = () => {
      store.dispatch('user/logout').then(() => {
        router.push('/login')
      })
    }

    return {
      options,
      roleOptions,
      user,
      secondDialog,
      inception,
      OnSubmit,
      goLogin,
    }
  },
}
</script>

<style scoped lang="less">
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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