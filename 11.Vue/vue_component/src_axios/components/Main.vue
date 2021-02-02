<template>
  <div>
    <h2 v-if="firstView">请输入关键字进行搜索</h2>
    <h2 v-else-if="loading">正在请求中......</h2>
    <h2 v-else-if="errorMsg">{{errorMsg}}</h2>
    <div class="row" v-else>
      <div class="card" v-for="(user, index) in users" :key="user.username">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.username}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
 /* 
  绑定监听
  数据类型
  分发自定义事件search，查找的是searchName
  发异步ajax请求获取用户列表数据，
  发请求前要更新状态数据--请求中状态loading，发请求后有两种结果
  请求成功更新状态，请求失败更新失败状态
  请求成功的数据，要用map处理
  */

  import axios from 'axios'
  export default {
    data () {
      return {
        firstView: true, // 是否显示第一个界面
        loading: false, // 是否正在请求加载中
        users: [], // 所有匹配的用户列表
        errorMsg: '', // 需要显示的错误提示信息
      }
    },

    mounted() {
      // 绑定一个事件监听 search
      this.$eventBus.$on('search', async (searchName) => {
        // 更新状态数据-请求中
        this.firstView = false
        this.loading = true

        // 发异步ajax请求获取用户列表数据
        /* axios('/api/search/users',{params: {q: searchName}})
          .then(
            response => {
              const result = response.data
              const users = result.items.map(item => ({
                username: item.login,
                url: item.html_url,
                avatar_url: item.avatar_url
              }))
              console.log('successful');
              this.loading = false
              this.users = users
            },
            error => {
              this.loading = false
              this.errorMsg = error.errorMsg
            }
          ) */

        // 用async 和 await 的语法
        try {
          const response = await axios('/api/search/users', {params: {q: searchName}})
          // 如果成功, 更新状态数据(成功)
          const result = response.data
          // map创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。为什么要用括号包起来???
          const users = result.items.map(item => ({
            username: item.login,
            url: item.html_url,
            avatar_url: item.avatar_url 
          }))
          console.log(users);
          this.loading = false
          this.users = users
        } catch (error) { // 如果失败, 更新状态数据(失败)
          this.loading = false
          this.errorMsg = error.message
        }
      })
    },

    beforeDestroy() {
      this.$eventBus.$off('search')
    }
  }
</script>

<style scoped>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
 
</style>
