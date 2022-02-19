<template>
  <aplayer
    autoplay
    :music="{
      title: 'secret base~君がくれたもの~',
      artist: 'Silent Siren',
      src: 'http://zhangq09-1309656300.cos.ap-shanghai.myqcloud.com/d7de62abd7497ede7d7b3db7fcbe7e1d.mp3',
      pic: 'https://img.ytmp3.cn/image/49.jpg',
    }"
  />
</template>

<script>
import aplayer from 'vue3-aplayer'

export default {
  components: {
    aplayer,
  },
}
</script>

<style>
</style>