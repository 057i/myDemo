<template>
  <div class="category">
    <dl class="m-category">
        <dt>按拼音首字母选择：</dt>
        <dd v-for="(item,index) in list"  :key="index">
          <a :href="'#city_'+item">{{item}}</a>
          <!--      搭配id切换样式-->
        </dd>
    </dl>
    <dl v-for="(item,index) in cityList" :key="index" class="m-category-section" :id="'city_'+index">
<!--      搭配id切换样式-->
      <dt>{{index}}</dt>
      <dd >
        <span v-for="city in item"
              :key="city.id"
              @click="changeCity(item)">{{city.name}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
  import api from '@/api/index'
  export default {
    data(){
      return{
        list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        cityList:[]
      }
    },
    created(){
      api.getCityList().then(res=>{
        let filterDate={}
        res.data.data.forEach((item)=>{
          if(! filterDate[item.firstChar.toUpperCase()]){
            filterDate[item.firstChar.toUpperCase()]=[]
          }
          filterDate[item.firstChar.toUpperCase()].push(item)
        })
        console.log(filterDate)
        this.cityList=filterDate
      })
    },
    methods:{
      changeCity(item){
        //切换城市
        this.$store.dispatch('setPosition',item[0].name)
        console.log(item[0].name)
        this.$router.push({name:'index'})
      }

    }

  }
</script>

<style lang="scss">
  @import "@/assets/css/changecity/category.scss";
</style>
