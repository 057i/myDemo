<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <m-menu/>
      </el-col>
      <el-col :span="19">
        <m-life/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <container :nav="iStyle" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" >
        <container :nav="recomment" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import MMenu from '@/components/index/menu.vue'
  import MLife from '@/components/index/life.vue'
  import Container from '@/components/index/container.vue'

  export default {
    data(){
      return{
        iStyle:{
          class:'iStyle',
          title:"有格调",
          list: [{
            text: '全部',
            tab: 'all'
          }, {
            text: '约会聚餐',
            tab: 'food'
          }, {
            text: '丽人SPA',
            tab: 'spa'
          }, {
            text: '电影演出',
            tab: 'movie'
          }, {
            text: '品质出游',
            tab: 'travel'
          }]
        },
        recomment: {
          class: 'youhui',
          title: '很优惠',
          list: [{
            text: '全部',
            tab: 'all'
          }, {
            text: '美食',
            tab: 'food'
          }, {
            text: '休闲',
            tab: 'xiuxian'
          }]
        }
       // resultData:[{
       //   title:'必胜客（福州永嘉PH店）',
       //   image:'//p0.meituan.net/msmerchant/36e41318a02a201e4958652c6a05cebb1942017.jpg@460w_260h_1e_1c',
       //   sub_title:'【限时半价】炙烤澳洲牛肉比萨（芝心）+超级至尊比萨（大方薄底）1份',
       //   price:'100',
       //   address:'博士后购物广场',
       //   remain:1
       //
       // },{
       //   title:'半天妖烤鱼（闽侯万家店）',
       //   image:'https://p0.meituan.net/msmerchant/fe7a1473d560271e1d99d91d8dfdef765607455.jpg@460w_260h_1e_1c',
       //   sub_title:'双人套餐',
       //   price:'135',
       //   address:'甘蔗镇',
       //   remain:1
       //
       // },{
       //   title:'凯旋烘焙',
       //   image:'https://p0.meituan.net/deal/__24217048__1003892.jpg@460w_260h_1e_1c',
       //   sub_title:'蛋糕10选1,约6英寸，圆形',
       //   price:'78',
       //   address:'福州大学城',
       //   remain:null
       //
       // }]
      }
    },
    components: {
      MMenu,
      MLife,
      Container
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";

</style>
