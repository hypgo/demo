## 1. vue单文件组件
    <template>
      <div>xxx</div>
    </template>
    <script>
      export default {
        props: []/{}
        data(){},
        computed: {}
        methods: {},
        watch: {}
        filters: {}
        directives: {}
        components: {}
      }
    </script>
    <style scoped>
    </style>
  

## 2. 组件化编码的基本流程
    1). 拆分界面, 抽取组件
    2). 编写静态组件
    3). 编写动态组件
        初始化数据, 动态显示初始化界面
        实现与用户交互功能

    设计data
        类型: [{id: 1, title: 'xxx', completed: false}]
        名称: todos
        位置: 如果只是哪个组件用, 交给它, 如果是哪些组件用, 交给共同的父组件
    
    关于状态数据的更新
        data数据定义在哪个组件, 更新数据的行为就定义在那个组件上
        如果子组件要更新父组件的数据, 调用父组件的更新函数来更新父组件的数据
        一个组件接收属性数据不要直接修改, 只是用来读取显示的

    相关问题：
        组件的data配置为什么只能是函数，不能是对象？
        - 保证同一个组件的多个实例对象的data对象不是共用的，而是各自的data对象
        组件对象与Vue是什么关系？
        - 所有组件对象的原型对象是一个vm对象
        - 所有组件对象都能看到定义在Vue原型对象上的属性和方法

## 3. 组件间通信
    1). 组件通信的5种方式
        props
        vue的自定义事件
        全局事件总线
        slot
        vuex(后面单独讲)
    2). props:
        父子组件间通信的基本方式
        属性值的2大类型:
            一般/非函数: 父组件-->子组件
            函数: 子组件-->父组件
        问题: 
            隔层组件间传递: 必须逐层传递(麻烦)
            兄弟组件间: 必须借助父组件(麻烦)
    3). vue自定义事件
        给子组件标签绑定事件监听 $on('事件名',callback)/$emit('事件名',data)  (绑定事件监听和分发事件的组件对象必须是同一个组件对象)
        子组件向父组件的通信方式
        功能类似于function props
        不适合隔层组件和兄弟组件间的通信
    4). 全局事件总线
        *要有绑定事件监听和分发事件的方法(能力)，才能实现任一组件间监听。*
        利用vm对象的$on()/$emit()/$off()。
        所有组件对象的原型对象都是一个vm对象
        创建vm对象作为全局事件总线对象保存到Vue的原型对象上, 所有的组件对象都可以直接可见:
            Vue.prototype.$bus = new Vue()
            任意组件A可以通过this.$bus.$on() 绑定监听接收数据
            任意组件B可以通过this.$bus.$emit() 分发事件, 传递数据  // 同步回调函数，emit执行打印先后顺序
    5). slot
        父组件向子组件通信
        通信是带数据的标签
        注意: 标签是在父组件中解析
    6). vuex
        多组件共享状态(数据的管理)
        组件间的关系也没有限制
        功能比事件总线强大, 更适用于vue项目

## 4. 自定义消息订阅与发布
    1). 相关语法
        a. PubSub: 包含所有功能的订阅/发布消息的管理者对象
        b. token PubSub.subscribe(msg, subscriber): 订阅消息: 指定消息名和订阅者回调函数
        c. PubSub.publish(msg, data): 异步发布消息: 指定消息名和数据
        d. PubSub.publishSync(msg, data): 同步发布消息: 指定消息名和数据
        e. PubSub.unsubscribe(flag): 取消订阅: 根据标识取消某个或某些消息的订阅
    2). 内部容器结构
        {
            "add": {
                uid_1: callback1,
                uid_2: callback2
            },
            "delete": {
                uid_3: callback3
            }
        }

## 5. 自定义事件总线
    1). 相关语法
        a. EventBus: 包含所有功能的全局事件总线对象
        b. EventBus.on(eventName, listener): 绑定事件监听
        c. EventBus.emit(eventName, data): 分发事件
        d. EventBus.off(eventName): 解绑事件监听
    2). 内部容器结构
        {
            "add": [callback1, callback2],
            "delete": [callback3]
        }

## 6. 与后台进行通信
    1). 使用什么发ajax请求?
        vue-resource   vue1.x使用
        axios vue2.x使用 ----> 学会怎样去描述一个技术：是什么，干嘛的，有什么用，为什么用，怎么用，用他有什么好处/坏处
    2). 在什么时候发请求?
        mounted()中
        事件监听回调函数或相关函数中

## 7. vue UI组件库
    常用的UI组件库
        PC: Element / iview /
        Mobile: mint-ui / vant-ui / cube-ui
    mint-ui的使用
        根据官方文档使用
        配置实现按需引入打包

## 路由的2种模式比较, 解决history模式404问题
    hash模式:
        路径中带#: http://localhost:8080/#/home/news
        发请求的路径: http://localhost:8080  项目根路径
        响应: 返回的总是index页面  ==> path部分(/home/news)被解析为前台路由路径

    history模式:
        路径中不带#: http://localhost:8080/home/news
        发请求的路径: http://localhost:8080/home/news
        响应: 404错误
        希望: 如果没有对应的资源, 返回index页面, path部分(/home/news)被解析为前台路由路径
        解决: 添加配置
            devServer: historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
            output: publicPath: '/', // 引入打包的文件时路径以/开头

> hash模式下，仅hash符号之前的内容会被包含在请求中，如 http://www.abc.com，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。
> history模式下，前端的URL必须和实际向后端发起请求的URL一致，如 http://www.abc.com/book/id。如果后端缺少对 /book/id 的路由处理，将返回 404 错误。??? 为啥啊