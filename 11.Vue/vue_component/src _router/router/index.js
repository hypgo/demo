/* 
路由器对象模块
路由使用：
1、创建路由组件
2、创建路由器
3、注册路由器和路由
4、router-link 和 router-view 生成路由链接和显示当前页面
*/

// 什么时候用暴露？
import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/pages/About'
import Home from '@/pages/Home'
import News from '@/pages/News'
import Message from '@/pages/Message'
import MessageDetail from '@/pages/MessageDetail'

// 声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({
  // vue-router默认hash模式,使用URL的hash来模拟一个完整的 URL，
  // 于是当URL改变时，页面不会重新加载，但url会多了一个#，用history可以去掉路径中的#
  mode: 'history', 
  // 应用中所有路由
  routes: [
    // 代表路由
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home,
      children: [ // 注册子路由
        {
          path: '/home/news',
          // 命名路由的用法，router-link :to="{name: 'news',params:{id:id}}"
          name: 'news',
          component: News,
        },
        {
          path: '/home/message',  // 等于 /home/message
          component: Message,
          children: [
            {
              path: '/home/message/detail/:id',
              name: 'detail',
              component: MessageDetail,
              // props: true,  // 内部自动将接收的parmas参数以标签属性传入路由组件
              // 函数返回的对象中的所有属性都会以标签属性传入路由组件,还可以传query参数 name: route.query.name
              props: (route) => ({id: route.params.id})  
            },
          ],
        },
        {
          path: '/home',
          redirect: '/home/news'
        }
      ]
    },

    // 自动重定向路由
    {
      path: '/',
      redirect: '/about'
    }
  ]
  
})