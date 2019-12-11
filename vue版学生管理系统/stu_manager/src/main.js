import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import api from './api'
import toast from './toast'

Vue.config.productionTip = false
Vue.prototype.$api=api;
Vue.prototype.$toast=toast
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
