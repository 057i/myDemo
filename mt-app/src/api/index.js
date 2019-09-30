//导入全局配置的axios配置
import axios from '@/axios'

var api={
  //封装获取网络请求的函数，返回一个promise对象

  //
  searchHotWords(params){  //第二个参数为拼接的参数
    return axios.get('/api/meituan/header/searchHotWords.json',params)
  },
  getSearchList(){
    return axios.get('/api/meituan/header/search.json')
  },
  getMenuList(){
    return axios.get('/api/meituan/index/nav.json')
  },
  resultByKeywords(){
    return axios.get('/api/meituan/index/resultsByKeywords.json')
  },
  getProductList(){
    return axios.get('/api/meituan/list/goodsList.json')
  },
  getRecentCity(){
    return axios.get('/api/meituan/city/recents.json')
  },
  getProvinceList(){
    return axios.get('/api/meituan/city/province.json')
  },
  getCurrent(){
    return axios.get('/api/meituan/city/province.json')
  },
  getCityList(){
    return axios.get('/api/meituan/city/cityList.json')
  },
  login(params){
    return axios.get('/api/meituan/login', params)
  },
  register(params){
    return axios.get('/api/meituan/register', params)
  }

}
export default api
