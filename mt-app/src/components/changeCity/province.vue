<template>
  <div>
    <!--  省份-->
    <m-select :listDate="provinceList"
              title="省份"
              :value="province"
              :showWrapperActive="provinceActive"
              :className="province"
              @changeActive="changeProvinceActive"
              @change="changeProvince"/>

    <m-select :listDate="cityList"
                      title="城市"
                      :value="city"
                      :showWrapperActive="cityActive"
                      :className="city"
                      @changeActive="changeCityActive"
                      @change="changeCity"
                      :disabled="cityDisabled"/>
      <span>直接搜索：</span>
      <el-select
        v-model="searchWord"
        filterable
        remote
        reserve-keyword
        placeholder="请输入城市中文或拼音">
        <el-option
          v-for="(item,index) in searchList"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>

</template>

<script>
  import MSelect from '@/components/changeCity/select.vue'
  import api from '@/api/index'
  export default {
    data(){
      return{
        provinceList:[],
        province:'省份',
        cityList:[],
        city:'城市',
        cityActive:false,
        provinceActive:false,
        searchList:['哈尔滨','佳木斯','牡丹江','鹤岗'],
        searchWord: '',
        loading:false,
        cityDisabled:false
      }
    },
    components:{
      MSelect
    },
    methods:{
      //互斥事件，切换省份显示状态
      changeProvinceActive(flag){
        this.provinceActive=flag;
        //达成互斥
        if(flag){
          this.cityActive=false
        }
      },
      //切换城市显示状态
      changeCityActive(flag){
        this.cityActive=flag;
        if(flag){
          this.provinceActive=false
        }
      },
      //切换省份，切换之后，恢复不点击状态
      changeProvince(area){
        this.province=area.name
        this.cityDisabled=false
        this.cityList=area.cityInfoList
      },
      changeCity(area){

        this.city=area.name
        //切换城市后跳转首页
        this.$store.dispatch('setPosition',area.name)
        this.$router.push({name: 'index'})
      }

    },
  created(){
    //获取省份信息,省份里面的cityInfoList就是城市信息
    api.getProvinceList().then(res=>{
      this.provinceList=res.data.data.map(item=>{
        //映射 可以不改名
        item.name=item.provinceName;
        return item
      })
    })
  }
  }
</script>

<style lang="scss">
  @import "@/assets/css/changecity/iselect.scss";
</style>
