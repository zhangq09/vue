<template>
  <div>欢迎光临:a</div>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

const store = useStore()
console.log(store)
console.log(store.state.user.User.nickname)
</script>

<style>
</style>