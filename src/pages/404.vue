<template>
  <div class="page">
    <div class="error-code">404</div>
    <div class="tips">抱歉,你访问的页面不存在!</div>
    <div class="action-area">
      <q-btn
        color="primary"
        outline
        label="返回"
        @click="
          () => {
            $router.back()
          }
        "
      ></q-btn>
      <q-btn
        color="primary"
        label="首页"
        @click="
          () => {
            $router.push('/')
          }
        "
      ></q-btn>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less">
</style>