
<template>
  <q-layout view="hHh lpR fFf">
    <!-- 这里是顶部展示部分 -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="../assert/logo.png" />
          </q-avatar>
          音乐盒
        </q-toolbar-title>
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

<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
}
</script>

<style>
</style>