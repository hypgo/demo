import Vue from 'vue'   // 得到的是Vue的构造函数，从node_modules里面找
import APP from "./App" // 省略了App.vue。引入自定义组件，用相对路径，从文件路径找
import store from './store'

Vue.config.productionTip = false // 不显示不是生产环境的提示

new Vue({
  el: '#root',
  template: '<App/>',
  components: { // 注册组件(后面才能写组件标签)
    App: APP    // 这个APP对应上面引入的
  },
  
  store  // 所有组件都能通过$store看到store对象
})