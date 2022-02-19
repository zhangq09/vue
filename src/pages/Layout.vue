
<template>
  <q-layout view="hHh lpR fFf">
    <!-- 这里是顶部展示部分 -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> 音乐盒 </q-toolbar-title>

        <q-space />
        <q-avatar
          color="teal"
          text-color="white"
          font-size="8px"
          style="cursor: pointer"
          @click="clickTo('/login')"
          >{{ nicknameFirstWord }}</q-avatar
        >
      </q-toolbar>
    </q-header>

    <!-- 这里是菜单 -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list padding class="text-primary">
        <q-item
          clickable
          v-ripple
          :active="item.name === route.name"
          active-class="my-menu-link"
          v-for="(item, index) in menus"
          :key="index"
          @click="clickTo(item.path)"
        >
          <q-item-section avatar>
            <q-icon :name="item.meta.icon" />
          </q-item-section>
          <q-item-section>{{ item.meta.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- 这里是中间展示的部分 -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import store from '../store'
import menuRoutes from '../router/menuRoutes.js'
import { useRoute } from 'vue-router'
import router from '../router'
import { isAdmin } from '../utils/role.js'
export default {
  components: {},
  setup() {
    const leftDrawerOpen = ref(false)

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const clickTo = (path) => {
      router.push(path)
    }
    const route = useRoute()
    const menus = menuRoutes.filter((r) => {
      if (r.meta.isAdmin !== true || (r.meta.isAdmin === true && isAdmin())) {
        return r
      }
    })
    const nicknameFirstWord = store.getters['user/nicknameFirstWord']
    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      clickTo,
      nicknameFirstWord,
      menus,
      route,
    }
  },
}
</script>

<style lang="less">
.my-menu-link {
  color: white;
  background-color: #f2c037;
}
</style>