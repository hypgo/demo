const { json } = require('express')
let express = require('express')
let cookieParser = require('cookie-parser')

let app = express()
app.use(cookieParser())

// demo路由不对cookie进行任何操作
app.get('/demo', (req, res) => {
  res.send('i am demo router,没有对cookie进行任何操作')
})

// 会话cookie，关闭浏览器就立刻消失
// demo1路由，负责给客服端“种下”cookie
app.get('/demo1', (req, res) => {
  // express中给客服端“种”cookie不需要任何的库
  let obj = { school: 'guigu', subject: 'front-end' }
  res.cookie('first', JSON.stringify(obj)) //给客服端种下一个会话cookie
  res.send('我是demo1路由给你的反馈')
})

// demo2，负责给客服端种下一个 持久化cookie。（多了一个参数 maxAge）
app.get('/demo2', (req, res) => {
  res.cookie('second', 'hello demo2', { maxAge: 1000 * 60 * 5 })  // 给客户端种下一个持久化cookie
  res.send('我是demo2路由给你的反馈，种下一个持久化cookie')
})

// demo3路由，负责读取客服端所鞋带过来的cookie
app.get('/demo3', (req, res) => {
  // express中读取客服端携带过来的cookie要借助一个中间件：cookie-parser
  console.log(req.cookies);  //{ first: '{"school":"guigu","subject":"front-end"}' }
  const { first } = req.cookies  //解构赋值
  let content = JSON.parse(first)
  console.log(content.school);
  res.send('我是demo3路由，读取了你携带过来的cookie，来看看吧')
})

// demo4路由，负责告诉客户端删除一个cookie
app.get('/demo4', (req, res) => {
  // res.cookie('second','',{maxAge:'0'})
  res.clearCookie('first')
  res.send('demo4路由在此，要删除你保存的key为second的那个cookie')
})

app.listen(3000, function (err) {
  if (err) console.log(err)
  else console.log('演示cookie的服务器启动成功');
})