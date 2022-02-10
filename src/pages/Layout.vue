
<template>
  <q-layout view="hHh lpR fFf">
    <!-- 这里是顶部展示部分 -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> 音乐盒 </q-toolbar-title>

        <q-space />
        <q-avatar color="teal" text-color="white" @click="toLogin">{{
          nicknameFirstWord
        }}</q-avatar>
      </q-toolbar>
    </q-header>

    <!-- 这里是菜单 -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <!-- 这里是中间展示的部分 -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import router from '../router'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toLogin() {
  router.push('/login')
}
const nicknameFirstWord = useStore().getters.nicknameFirstWord
</script>

<style>
</style>