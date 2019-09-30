<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>{{$store.state.position}}美团</el-breadcrumb-item>
    <el-breadcrumb-item>{{$store.state.position}}{{$store.state.searchWord}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    created () {
      console.log(this.$store.state.searchWord)
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
