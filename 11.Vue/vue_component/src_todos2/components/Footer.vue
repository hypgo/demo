<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll" />
    </label>
    <span>
      <span>已完成{{completeSize}} /</span> 全部{{todos.length}} 
    </span>
    <button class="btn btn-danger" v-show="completeSize>0" @click="clearCompletedTodos">清除已完成任务</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      todos: Array,
      clearCompletedTodos: Function,
      checkAll: Function,
    },

    computed: {
      completeSize () {
        // 获取复选框为true的个数 reduce的语法还不懂
        return this.todos.reduce((preTotal,todo,index) => preTotal + (todo.completed ? 1 : 0), 0)
      },

      isCheckAll: {
        get () {
          /* completeSize为什么不加括号??? completeSize括号里传的是地址值
          读属性值就会自动调用对应的getter方法 */
          return this.todos.length === this.completeSize && this.completeSize > 0
        },

        set (value) { // value代表当前勾选状态的布尔值
          this.checkAll(value)  
        }
      }, 
    }
  }

</script>

<style scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
