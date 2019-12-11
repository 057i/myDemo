import urls from './urls'
import axios from 'axios'
const appkey={
    appkey: "dongmeiqi_1547441744650"
}
const size=5;
//封装axios函数，成为可以自定义的
const  myAJAX= axios.create({
            baseURL:urls.baseURL,
            method:'get'
        })

export default {
    updateStu(stu) {//传一个修改的对象过来，然后传到服务器
        return myAJAX({
            url:urls.updateStu,
            params:{
                ...appkey,
                ...stu
            }
        })

    },

    findByPage(page) {
        return myAJAX({
            url: urls.findByPage,
            params: {
                ...appkey,
                page,
                size
            }
        })
    },
    addStu(stu){
        return myAJAX({
            url:urls.addStu,
            params:{
                ...appkey,
                ...stu
            }
        })
    },
    searchStu(data){
        return myAJAX({
            url:urls.searchStu,
            params:{
                sex:-1,
                ...data,
                ...appkey
            }
        })

    },
    delStuBySNo(sNo){
        return myAJAX({
            url:urls.delStuBySNo,
            params:{
                ...appkey,
                sNo
            }
        })
    }

}
