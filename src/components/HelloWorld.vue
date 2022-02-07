<script setup>
import axios from 'axios'
import { ref } from 'vue'
import {sayHello} from '../api/hello'

const message = ref('第一次尝试跟项目')
const count = ref(0)

const hi= ()=>{
  sayHello().then(res=>{
    message.value = res.data
  },error=>{
    console.log(error)
  })
}
</script>

<template>
  <h1>{{ message }}</h1>
  <div >
      <q-btn color="primary" @click="count++">点击次数:{{count}}</q-btn>
      <br>
      <br>
      <q-btn color="primary" @click="hi">请求接口</q-btn>
  </div>
 

</template>

<style scoped>
a {
  color: #42b983;
}
.button-container{
  width: 50%;
  flex-direction: row;
  display: flex;
}
</style>
