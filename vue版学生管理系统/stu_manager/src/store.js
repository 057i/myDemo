import Vue from 'vue'
import Vuex from 'vuex'
import api from './api/index'

Vue.use(Vuex)

export default new Vuex.Store({
    //默认公有值
    state: {
        showModal: false,
        editStu: {},
        nowPage: 0,
        totalPage: 0,
        keyWord: '',
        count: 0,
        list: []
    },
    //
    mutations: {
        //设置当前页码
        setPage(state, page) {
            state.nowPage = page
        },
        //计算总条数和总页数
        setCount(state, count) {
            state.count = count
            state.totalPage = Math.ceil(count / 5)
        },
        //设置列表总数（只在第一次获取和删除学生数据时候向服务器获取）
        setList(state, list) {
            state.list = list
        },
        //本地存储修改学会的临时信息
        seteditStu(state, stu) {
            state.editStu = stu
        },
        //更改模态框属性
        changeShowModal(state, bool) {
            state.showModal = bool
        },
        //设置共享搜索关键词
        changeKeyWord(state, word) {
            state.keyWord = word
        }
    },
    actions: {
        //做获取全部学生和按关键字查询学生，如果搜索关键字为空时候，只去触发获取全部学生数据，
        // 没有为空的时候，去触发搜索学生
        getStudent({commit, state}, page) {
            //设置当前页是第几页
            if (page) {
                commit('setPage', page)
            }
            if (state.keyWord !== '') {
                //搜索学生
                return api.searchStu({
                    search: state.keyWord,
                    page: state.nowPage,
                    size: 1
                }).then(res => {
                    if (res.data.status == 'success' && res.data.data.searchList.length != 0) {
                        commit('setList', res.data.data.searchList)
                        commit('setCount', res.data.data.cont)
                    } else {
                        console.log(`未查询到${state.keyWord}的记录`)
                    }
                })

            } else {

                return api.findByPage(state.nowPage).then(data => {
                    commit('setList', data.data.data.findByPage)
                    commit('setCount', data.data.data.cont)
                })
            }

        },

        //删除学生信息并存储公有值
        delStudent({dispatch, state}, sNo) {
            return api.delStuBySNo(sNo).then(data => {
                if (data.status == 'success') {
                    if (state.nowPage > Math.ceil((state.count - 1) / 5)) {
                        this.$toast({
                            type:data.status,
                            msg:data.msg
                        })
                        dispatch('getStudent', state.nowPage - 1)
                    } else {
                        dispatch('getStudent')
                    }
                } else {

                }
            })
        },
        updataStuInfo({commit, state}, stu) {
            return api.updateStu(stu).then((data) => {
                return new Promise((res, rej) => {
                    if (data.data.status = 'success') {
                        //如果修改成功，就把遮罩层取消，并且直接返回值
                        this.commit('changeShowModal', false)
                        state.list = Object.assign(state.list, stu)
                        res(data.data)
                    } else {
                        //shi失败的话
                        rej(data)

                    }
                })
            })
        }


    }
})
