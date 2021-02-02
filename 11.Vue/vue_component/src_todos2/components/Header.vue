<template>
  <div class="todo-header">
    <!-- 利用双向数据实现绑定，实现自动收集数据 -->
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="add" v-model="title"/>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    // 声明接收属性：更新数据的函数属性
    props: {
      addTodo: {
        type: Function,
        // required: true
      }
    },

    data () {
      return {
        title: '',
      }
    },

    methods: {
      // @keyup.enter="add"按下enter案件后就触发这个函数来封装需要展示的数据
      add () {
        // 根据输入的title封装一个todo对象
        const title = this.title.trim();
        if (!title) return;
        const todo = {
          id : Date.now(),
          title,
          completed: false
        }

        // 调用更新的函数，向todos中添加一个todo。因为addTodo是在组件对象里面的，必须要加this才能调用
        // this.addTodo(todo)
        this.$emit('addTodo', todo)
        this.title = ''
      }
    }
  }
</script>

<style scoped>
  .todo-header input {
    width: 560px;
    height: 29px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  } 
</style>
