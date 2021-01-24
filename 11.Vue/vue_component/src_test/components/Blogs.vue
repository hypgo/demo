<template>
  <div>
    <h2>Blog列表</h2>
    <ul>
      <!-- :blog="blog", 前面blog来源于注册的 -->
      <Blog v-for="(blog, index) in blogs" :key="blog.id" :blog="blog"/>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Blog from './Blog'

  export default {
    data() {
      return {
        blogs: [
          {id: 1, title: 'Blog1111'},
          {id: 3, title: 'Blog3333'},
          {id: 5, title: 'Blog5555'},
        ]
      }
    },
    // 注册局部组件, 只能在当前组件使用
    components: { 
      Blog
    }
  }
</script>

/* scoped: 限定当前组件的样式只对当前组件有效, 对外部和内部的其它组件无效 */
<style scoped>
  h2 {
    color: red;
  }
</style>