<template>
  <div class="m-menu " @mouseleave="menuLeave">
    <dl class="nav" @mouseleave="menuLeave">
      <dt>全部分类</dt>
      <dd v-for="(item,index) in menuList" :key="index" @mouseenter="menuEnter(item)">
        <i :class="item.name"></i>
        {{item.name}}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-if="curDetail" @mouseenter="detailEnter" @mouseleave="detailLeave">
      <template v-for="(item,index) in curDetail.items">
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="(v,i) in item.items" :key="v+'_'+i">{{v}}</span>
      </template>
    </div>
  </div>

</template>

<script>
  import api from '@/api/index'
  export default {
    name: 'MMenu',
    data () {
      return {
        curDetail: null,
        menuList: []
      }
    },
    methods: {
      menuEnter (item) {
        //解决小菜单显示问题
        this.curDetail = item
      },
      menuLeave () {
        //解决小菜单不消失问题
        let self = this
        this.timer = setTimeout(() => {
          self.curDetail = null
        }, 200)
      },
      detailEnter () {
        clearTimeout(this.timer)
      },
      detailLeave () {
        this.curDetail = null
      }
    },
    created(){
      //渲染菜单栏
      api.getMenuList().then(res=>{
        console.log(res.data.data)
        this.menuList=res.data.data
      })
    }
  }
</script>

