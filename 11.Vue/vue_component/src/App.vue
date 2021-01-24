<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!-- 动态传递函数，每次调用都能获取 -->
      <Header :addTodo="addTodo"/>
      <!-- 标签属性props，读的是组件对象的属性 -->
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo"/>
      <Footer :todos="todos" :clearCompletedTodos="clearCompletedTodos" :checkAll="checkAll"/>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import List from '@/components/List.vue'
  import Footer from '@/components/Footer.vue'

  export default { // 配置对象
    data () {
      return {
        todos: []
      }
    },

    mounted () {
      // 模拟异步读取数据
      setTimeout(() => {
        // 读取localStorage保存的todos，更新数据
        this.todos = JSON.parse(localStorage.getItem('todos_key') || '[]')
        // this.todos = JSON.parse(localStorage.getItem('todos_key')) || []
      }, 1000);
    },

    // 所有方法、函数都放在这里写
    methods: {
      addTodo (todo) {   // unshift 方法
        this.todos.unshift(todo)
      },
      // 要想办法传给item，向后代传数据，通过他的孩子逐层传递
      deleteTodo (index) {
        this.todos.splice(index, 1)
      },

      clearCompletedTodos () {
        // filter返回布尔值，不会产生新数组。过滤数组，todo.completed的值为布尔值，把true去掉，把false的留下来
        this.todos = this.todos.filter((todo, index) => !todo.completed)
     
      },

      checkAll (isCheckAll) { 
        this.todos.forEach(todo => todo.completed = isCheckAll);
      },

      updateTodo (todo, isCheck) {
        todo.completed = isCheck
      }
    },

    watch: {
      todos: {
        deep: true,   // 深度监视：本身和内部所有层次的数据
        handler (value) {  // value是最新的todos值
          // 将todos保存到local中，以JSON形式保存
          localStorage.setItem('todos_key', JSON.stringify(value))
        }
      }
    },

    // 注册组件
    components: {
      Header,
      List,
      Footer
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 50px auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

</style>