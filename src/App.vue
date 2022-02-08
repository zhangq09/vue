<script setup>
</script>

<template>
  <router-view />
</template>

<style lang="less">
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .error-code {
    font-size: 200px;
  }
  .tips {
    font-size: 20px;
    color: rgb(26, 73, 92);
    margin-bottom: 30px;
  }
  .action-area {
    width: 225px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
