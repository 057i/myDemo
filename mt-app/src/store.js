import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)  //使用状态管理

const state = {
  position: '福州',
  searchWord: ''
}
const getter = {}
const mutations = {
  setPosition (state, val) {
    state.position = val
  },
  userName (state, val) {
    state.userName = val
  },
  searchWordHandle (state, val) {
    state.searchWord = val
  }
}
const actions = {
  setPosition ({commit}, val) {
    console.log(val[0].name)
    commit('setPosition', val)
  }

}
export default new Vuex.Store({
  state,
  getter,
  mutations,
  actions
})
