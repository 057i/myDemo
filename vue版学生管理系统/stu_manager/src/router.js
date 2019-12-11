import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  linkExactActiveClass:'left-active',//选中某个路由时候添加类名
  mode:'history',
  routes: [

    {
      name:'stuList',
      path:'/stuList',// 一级后缀写斜杆/
      component:()=>import('@/views/stuList')
    },
    {
      name:'addStu',
      path:'/addStu',// 一级后缀写斜杆/
      component:()=>import('@/views/addStu')
    }
  ]
})
