import Vue from 'vue'  
import App from './App'
import store from './vuex/store'

new Vue({
  components: {
    App: App
  },
  template: '<App/>',
  // 所有的组件对象都有一个指定store属性: $store
  store 
}).$mount('#root')