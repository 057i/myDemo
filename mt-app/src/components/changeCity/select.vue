<template>
  <div class="choose-wrap"
       @click="showWrapper"
       v-document-click="documentClick">
<!--    绑定自定义指令-->
    <div class="choose">
      <span>{{value}}</span>
      <i class="el-icon-caret-bottom"></i>
      <div :class="{'mt-content':true,'active':showWrapperActive}">
        <h2>{{title}}</h2>
<!--        <div class="wrapper">-->
<!--          <div class="col" v-for="(list,index) in renderList" :key="index">-->
<!--            <span v-for="(item,index) in list"-->
<!--                  :key="index"-->
<!--                  @click="changeValue(item)"-->
<!--                  :class="{'mt-item':true,'active':item==value}">-->
<!--              {{item.name}}-->
<!--            </span>-->

<!--          </div>-->
        <div :class="['wrapper', className]">
          <div class="col" v-for="(list, index) in renderList" :key="index">
                        <span :class="{'mt-item': true, 'active': item.name == value}"
                              v-for="(item, index) in list"
                              :key="index"
                              @click="changeValue(item)">
                          {{item.name}}
                        </span>
          </div>
        </div>

        </div>
      </div>

    </div>


  </div>
</template>

<script>
  export default {
    props: [
      'title',
      'value',
      'disabled',
      'className',
      'listDate',
      'showWrapperActive'
    ],
    data(){
      return{
      }
    },
    computed: {
      renderList:function () {
        let col=Math.ceil(this.listDate.length/12)
        let resultList=[];
        for(var i=0;i<col;i++){
          let data=this.listDate.slice(i*12,i*12+12)
          resultList.push(data)
        }
        console.log(resultList)
        return resultList
      }

    },
    methods:{
      showWrapper(e){
        e.stopPropagation()
        if(!this.disabled){
          this.$emit('changeActive', true);
        }
        //触发当前组件的父级组件事件，显示
      },
      //利用指令，把点击事件绑在window上
      documentClick(){
        this.$emit('changeActive',false)
        console.log('更改显示状态',this.$props)
      },
      changeValue(item){
        this.$emit('change',item)

      }

  }
  }
</script>

<style lang="scss">
  @import "@/assets/css/changecity/select.scss";
</style>
