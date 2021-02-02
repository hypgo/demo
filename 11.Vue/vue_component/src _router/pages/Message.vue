<template>
  <div>
    <ul>
      <li v-for="(m, index) in messages" :key="m.id">
      <!-- <router-link :to="'/home/message/detail/' + m.id"> {{m.title}} </router-link> -->
      <!-- <router-link :to="`/home/message/detail/${m.id}`"> {{m.title}} </router-link> -->
      <router-link :to="{name:'detail',params:{id:m.id}}"> {{m.title}} </router-link>
      --<button @click="pushShow(m.id)">push查看</button>
      --<button @click="replaceShow(m.id)">replace查看</button>
      </li>
    </ul>
    
    <!-- 编程式导航的三种不同 （等同于与声明式导航<router-link :to=""></router-link>）
    1.this.$router.push()
      跳转到不同的url，会向history栈添加一个记录，点击后退会返回到上一个页面。
    2.this.$router.replace()
      同样是跳转到指定的url，但不会向history里面添加新的记录，即使点击返回按钮也不会回到这个页面。
    3.this.$router.go(n)
      相对于当前页面向前或向后跳转多少个页面,类似 window.history.go(n)。n可为正数可为负数。正数返回上一个页面
    -->
    <button @click="$router.back()">back返回</button>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        messages: []
      }
    },

    mounted() {
      // 模拟发送异步ajax请求获取消息列表数据
      setTimeout(() => {
        const messages = [
          {id: 1, title: 'message001'},
          {id: 2, title: 'message002'},
          {id: 3, title: 'message003'}
        ]
        this.messages = messages

      }, 1000);
    },

    methods: {
      pushShow (id) {
        console.log(this.$router);
        // this.$router.push(`/home/message/detail/${id}`)
        this.$router.push({name:'detail',params:{id}})
      },

      replaceShow (id) {
        console.log(this.$router);
        this.$router.replace(`/home/message/detail/${id}`)
      }
    },
  }
</script>

<style scoped>

 
</style>
