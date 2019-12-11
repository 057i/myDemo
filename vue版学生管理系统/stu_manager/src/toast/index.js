import index from './index.vue'
import Vue from 'vue'
//仿写element.ui
const Toast=Vue.extend(index)//拓展生成一份模板，组件构造器
export default function createToast(duration=2000,type,msg) {
    console.log(duration,msg,type)
    const app=new Toast({
        el:document.createElement("div"),
        data: {
            showClass: true,
            over:true,
            msg,
            type

        }
    })
    document.body.appendChild(app.$el)//挂载到当前页面的body上面
    //设置渐出
    setTimeout(()=>{
        app.showClass=false
    },duration-300)//预留300毫秒用于渐出

    //设置元素消失
    setTimeout(()=>{
        app.over=false
    },duration)

}

