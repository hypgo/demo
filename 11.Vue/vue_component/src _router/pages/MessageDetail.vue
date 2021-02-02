<template>
  <ul>
    <!-- <li>id:{{$route.params.id}}</li> -->
    <li>id:{{id}}</li>
    <li>Title:{{detail.title}}</li>
    <li>Content:{{detail.content}}</li>
  </ul>

</template>
// 写完基本结构, index.js里面注册路由,并且引入
<script type="text/ecmascript-6">
  const allMessageDetails = [
    {id: 1, title: 'message001', content: 'message content001'},
    {id: 2, title: 'message002', content: 'message content002'},
    {id: 3, title: 'message003', content: 'message content003'},
  ]

  /* 
    路由组件对象是在第一次请求对应路径时才创建
    从一个路由组件离开, 路由组件死亡, 再进入需要重新创建
    当在同一个路由路径上做切换(只是改了参数), 当前路由组件对象被直接复用
    同一个组件对象mounted()只执行一次
    因此，要用watch来监视路由组件的切换
    */
  export default {
    props: ['id'],
    data() {
      return {
        detail: {}
      }
    },

    mounted() {
      setTimeout(() => {
        const id = this.id * 1
        const detail = allMessageDetails.find(detail =>  detail.id === id )
        this.detail = detail
      }, 1000);
    },

    watch: {
      // 当请求参数发生改变时, 内部指定了新的$route属性
      '$route'(to, from) {
        // 对路由变化作出响应...
        setTimeout(() => {
          // to代表现在新的，from代表旧的。
          // 得到当前新的id
          const id = this.id * 1
          const detail = allMessageDetails.find(detail =>  detail.id === id )
          this.detail = detail
        }, 1000);
      }
    }
  }
</script>

<style scoped>

 
</style>
