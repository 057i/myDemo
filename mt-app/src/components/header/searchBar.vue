<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <router-link to="/">
          <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
        </router-link>
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="searchWord" placeholder="搜索商家或地点" @focus="focusInput" @blur="blurInput"
                    @input="input"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="searchHandle"></el-button>
          <dl v-if="isSuggestList" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,index) in hotPlaceList"
                :key="index"
                @click="collectSearchWord(item)">
              <router-link :to="{name:'goodList',params:{name:item}}">{{item}}</router-link>
            </dd>
          </dl>

          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item,index) in searchList"
                :key="index"
                @click="collectSearchWord(item)">
              <router-link :to="{name:'goodList',params:{name:item}}">{{item}}</router-link>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <span v-for="(item,index) in suggestList" @click="collectSearchWord(item)">
             <router-link :to="{name:'goodList',params:{name:item}}"
                          :key="item+'_'+index">{{item}}
              </router-link>
          </span>
        </p>
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import api from '@/api/index'

  export default {
    data () {
      return {
        searchWord: '',
        suggestList: [],
        hotPlaceList: [],
        searchList: [],
        inputFocus: false
      }
    },
    created () {
      api.searchHotWords().then(res => {
        this.hotPlaceList = res.data.data.slice(0, 4)
        this.suggestList = res.data.data
      })
      console.log(111)

    },
    watch: {
      //监听路由后缀值的变化
      '$route.params.name': function () {
        this.searchWord = this.$route.params.name
      }
    },

    methods: {
      searchHandle () {

      },
      focusInput () {
        this.inputFocus = true
      },
      blurInput () {
        //是去焦点时候下拉框消失
        var self = this
        setTimeout(function () {
          self.inputFocus = false
        }, 200)
      },
      input () {
        //  输入完成后调用axios请求数据，在前端做数据筛选
        let searchWord = this.searchWord
        let self = this
        api.getSearchList(searchWord).then(res => {
          self.searchList = res.data.data.list.filter((item) => {
            //筛选出带有关键字的渲染列表
            return item.indexOf(searchWord) != -1
          })
        })
      },
      collectSearchWord(val){
        this.$store.commit('searchWordHandle',val)
        this.searchWord=this.$store.state.searchWord
      }

    },
    computed: {
      isSuggestList () {
        //没有搜索关键字且在聚焦时候
        return !this.searchWord && this.inputFocus
      },
      isSearchList () {
        return this.searchWord && this.inputFocus

      }

    }

  }
</script>
<style lang="scss">
  @import "@/assets/css/public/header/index.scss";
  @import "@/assets/css/public/header/search.scss";
</style>


