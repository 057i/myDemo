<template>
  <div class="m-istyle">
    <dl :class="nav.class" @mouseover="over">
      <dt>{{nav.title}}</dt>
      <dd v-for="(item,index) in nav.list"
          :key="index"
          :class="{active:kind==item.tab}"
          :data-type="item.tab">
        {{item.text}}
      </dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item,index) in resultData[kind]" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.image" class="image">
          <div class="cbody">
            <div class="title">{{item.title}}</div>
            <div class="sub-title">{{item.subTitle}}</div>
            <div class="price-info">

              <!--                remain和价格配合使用-->
              <span class="current-price-wrapper" >
                  <span class="price-symbol numfont">¥</span>
                  <span class="current-price numfont">{{item.price}}</span>
                  <span class="old-price">门市价¥{{item.price * 1.3}}</span>
                </span>
<!--              <span class="current-price-wrapper" v-else>-->
<!--                  <span class="current-price numfont">抢光了</span>-->
<!--                </span>-->
<!--              <span class="sold bottom-right-info">{{item.address}}</span>-->
            </div>
          </div>
        </el-card>
      </li>
    </ul>


  </div>
</template>

<script>
  import api from '@/api/index'

  export default {
    props: ['nav'],
    data () {
      return {
        kind: 'all',//定义一个默认选中的tab
        resultData:{}
      }
    },
    methods: {
      over (e) {
        let tagName = e.target.tagName.toLocaleLowerCase()
        if (tagName == 'dd') {
          this.kind = e.target.getAttribute('data-type')
          // 这里还差一个切换tab动态获取请求
        }
      }
    },
    created () {
      api.resultByKeywords().then(res=>{

        this.resultData=res.data.data
        console.log(this.resultData)
      })
    }

  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/index/artistic.scss";
</style>
