import axios from 'axios'

//将axios属性配置在全局
axios.defaults.baseURL = 'http://api.duyiedu.com';
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //配置自定义属性在全局axios上
  config.params={
    ...config.params,
    appkey: 'lwq4988441_1554057388125'
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})
export default axios
