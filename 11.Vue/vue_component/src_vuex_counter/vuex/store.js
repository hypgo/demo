// vuex最核心的管理对象模块
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1
}

/* 
一个包含n个用于直接更新状态数据的方法的对象
mutation方法不要包含异步操作和逻辑处理代码
作用：记录mutation调用前后的数据变化
*/
const mutations = {
  // 增加的mutation
  INCREMENT (state) {
    state.count++
  },

  // 减少的mutation
  DECREMENT (state) {
    state.count--
  }
}

/* 
一个包含n个用于间接更新状态数据的方法的对象
action方法中可以包含异步操作和逻辑处理代码
*/
const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000);
  }
}

// 一个包含n个基于state数据的getter计算属性的方法的对象
const getters = {
  
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})