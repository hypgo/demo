/*
 中间件：
     概念：本质上就是一个函数，包含三个参数：request、response、next
 作用：
        1)	执行任何代码。
        2)	修改请求对象、响应对象。
        3)	终结请求-响应循环。(让一次请求得到响应)
        4)	调用堆栈中的下一个中间件或路由。
  分类：
        1)	应用(全局)级中间件（过滤非法的请求，例如防盗链）
              --第一种写法：app.use((request,response,next)=>{})
              --第二种写法：使用函数定义
        2)	第三方中间件，即：不是Node内置的，也不是express内置的（通过npm下载的中间件，例如body-parser）
              --app.use(bodyParser.urlencoded({extended:true}))
        3)	内置中间件（express内部封装好的中间件）
              --app.use(express.urlencoded({extended:true}))
              --app.use(express.static('public')) //暴露静态资源
        4)	路由器中间件 （Router）
              --后面讲
   备注：
        1.在express中，定义路由和中间件的时候，根据定义的顺序（代码的顺序），将定义的每一个中间件或路由，
        放在一个类似于数组的容器中，当请求过来的时候，依次从容器中取出中间件和路由，进行匹配，如果匹配
        成功，交由该路由或中间件处理，如果全局中间件写在了最开始的位置，那么他就是请求的“第一扇门”。
        2.对于服务器来说，一次请求，只有一个请求对象，和一个响应对象，其他任何的request和response都是对二者的引用。
 */

const express = require('express')
const app = express()

//【第一种】使用应用级(全局)中间件---所有请求的第一扇门---*所有请求*都要经过某些处理的时候用此种写法
/* app.use((request , response , next)=>{
  // response.send('这是中间发送的内容')
  // 图片防盗链
  if (request.get('Referer')){
    let miniReferer = request.get('Referer').split('/')[2]
    console.log(miniReferer);
    if (miniReferer === '127.0.0.1:3492'){
      next()
    } else {
      // 发生了盗链
      response.sendFile(__dirname + '/source/err.png')   
    }
  } else {
    next()
  }
})  */

//【第二种】使用全局中间件的方式------更加灵活，不是第一扇门，可以在任何需要的地方使用。
function demo(request , response, next) {
  if (request.get('Referer')){
    let miniReferer = request.get('Referer').split('/')[2]
    console.log(miniReferer);
    if (miniReferer === '127.0.0.1:3492'){
      next()
    } else {
      // 发生了盗链
      response.sendFile(__dirname + '/source/err.png')   
    }
  } else {
    next()
  }
}

// 解析post请求请求体中所携带的urlencoded编码形式的参数为一个对象，随后挂载到request对象上(对象追加属性)
app.use(express.urlencoded({extended : true}))

// 使用内置中间件去暴露静态资源 ---- 一次性把你所指定的文件夹内的资源全部交出去。source是文件夹
/* 暴露之后发生这些：在浏览器输入地址localhost：3000/life，先在文件夹中找life，没找到就找路由。如果找到了，
路由并不知道这个文件是什么，所以会弹出一个下载框，自行下载判断。
*/
app.use(express.static(__dirname + '/source'))

app.get('/' , (request , response) => {
  response.send('index')
})

app.get('/demo' , (request , response) => {
  response.send('this is demo')
})

app.get('/food' , (request , response) => {
  response.sendFile(__dirname + '/source/food.html')
})

app.get('/life' , (request , response) => {
  console.log('life路由被触发了');
  response.sendFile(__dirname + '/source/life.html')
})

app.post('/test' , (request , response) => {
  console.log(request.body);
  response.send('<h1> 我是中间件测试页面 </h1>')
})
// 中间件，请求来了交给demo，通过后再响应 
app.get('/picture', demo, (request , response) => {
  response.sendFile(__dirname + '/source/wbb.jpg')
  console.log('yes');
})

app.listen(3000, function (err){
  if (!err) console.log('success')
  else console.log(err)
})