<template>
  <div>欢迎光临:{{ username }}</div>
  <q-btn color="primary" class="q-mt-md" label="退出" @click="logout"></q-btn>
</template>

<script setup>
import router from '../../router'
import store from '../../store'

const username = store.state.user.currentUser.username
const logout = () => {
  store.dispatch('user/logout').then(() => {
    router.push('/login')
  })
}
</script>

<style>
</style>