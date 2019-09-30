import Vue from 'vue'
import Router from 'vue-router'
import defaultPage from '@/layout/default.vue'
import blankPage from '@/layout/blank.vue'
import Index from '@/pages/index.vue'
import changeCity from '@/pages/changeCity.vue'
import goodList from '@/pages/goodList.vue'
import Login from '@/pages/login.vue'
import Register from '@/pages/register.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'defaultPage',
      component: defaultPage,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/changeCity ',
          name: 'changeCity',
          component: changeCity
        },
        {
          path: 's/:name',
          name: 'goodList',
          component: goodList
        },
        {
          path: '/productDetail',
          name: 'productDetail'
        }
      ]
    },
    {
      path: '/blank',
      name: 'blankPage',
      component: blankPage,
      children: [{
        path: 'login',
        name: 'login',
        component: Login
      },
        {
          path: 'register',
          name: 'register',
          component: Register
        }]
    }
  ]
})
