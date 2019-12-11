<template>
  <div id="app">
    <sys-head/>
    <sys-left/>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  //script只能引入组件
import sysHead from  '@/components/sysHead'
import sysLeft from  '@/components/sysLeft'

export default {
  name: 'app',
  components: {
    sysHead,
    sysLeft
  }
}
</script>

<style>
/* 引入样式自动填充，因为模板渲染到页面上面时候，自己会去匹配类名*/
  @import url(./index.css) ;
</style>
