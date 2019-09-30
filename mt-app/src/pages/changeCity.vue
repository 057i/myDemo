<template>
<div class="page-changeCity">
  <el-row>
    <province/>
  </el-row>
  <el-row>
    <hot title="热门城市："
      :hotCityList="hotCityList"/>
  </el-row>
  <el-row>
    <category/>
  </el-row>
</div>
</template>

<script>
  import Province from '@/components/changeCity/province.vue'
  import hot from '@/components/changeCity/hot.vue'
  import Category from '@/components/changeCity/category.vue'
  export default {
    components:{
      Province,
      hot,
      Category
    },
    data(){
      return{
        hotCityList:['北京','上海','广州',
                '深圳','天津','西安','重庆','杭州',
                '南京','武汉','成都']
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/changecity/hot.scss";
  @import "@/assets/css/changecity/category.scss";

</style>
