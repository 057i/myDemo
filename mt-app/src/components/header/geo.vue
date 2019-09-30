<template>
  <div class="m-geo">
    <div class="position">
      <i class="el-icon-location"/>
      <!--      后面用获取定位填充数据-->
      {{$store.state.position}}
      <router-link class="changeCity" :to="{ name:'changeCity'}">切换城市</router-link>
      <!--      这里的to需要数据绑定-->
      [
      <a href="#" v-for="(item,index) in recentCity"
         :key="index">{{item.name}} </a>
      ]
    </div>
    <!--这里差一个v-if如果以及登录了这两个路由就不显示了-->
    <div class="m-user" v-if="!$store.state.userName">
      <!--      路由切换登录页面和注册页面-->
      <router-link class="login" tag="span" :to="{name:'login'}">立即登录</router-link>
      <router-link class="register" tag="span" :to="{name:'register'}">注册</router-link>
    </div>
  </div>
</template>
<script>
  import api from '@/api/index'
  export default {
    data(){
      return {
        recentCity:[]
      }
    },
    methods:{

    },
    created(){
      api.getRecentCity().then(res=>{
        this.recentCity=res.data.data
      })
      console.log(this.$store.state.position)
    }
  }
</script>

