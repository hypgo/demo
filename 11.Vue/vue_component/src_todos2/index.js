// import Vue from 'vue/dist/vue.runtime.common'   // 不带编译器模块的文件
// import Vue from 'vue/dist/vue.esm.js'   // 带编译的文件，简写为vue

import Vue from 'vue'   // 得到的是Vue的构造函数，从node_modules里面找
import APP from "./App" // 省略了App.vue。引入自定义组件，用相对路径，从文件路径找

// import './base.css'   // 文件在当前src文件夹下

// 注册全局组件。注册相当于确定组件的标签名 'APP'
// Vue.component('App', App) 

Vue.config.productionTip = false // 不显示不是生产环境的提示

/* 
所有组件对象的原型对象都是一个vm对象  --> Vue原型对象是组件对象的原型链上的对象
创建一个全局的用于绑定事件监听和分发事件的对象：Glogbal Event Bus (全局事件总线)
事件总线对象就是一个vm，将其挂在到Vue的原型对象上，所有的组件对象就都可以看到这个时间总线对象
*/
// Vue.prototype.$globalEventBus = new Vue()

new Vue({
  // 尽量早的执行挂载全局事件总线对象的操作
  beforeCreate() {
    Vue.prototype.$globalEventBus = this
  },

  el: '#root',
  // 注册局部组件
  template: '<App/>',
  components: { // 注册组件(后面才能写组件标签)
    App: APP    // 这个APP对应上面引入的
  },
})