// 引入node中的内置http模块
let http = require('http')

/*
引入一个内置模块，用于解析key=value&key=value.....这种形式的字符串为js中的对象
备注：
  1.key=value&key=value.....的编码形式，叫做 urlencoded编码形式。
  2.请求地址里携带urlencoded编码形式的参数，叫做 查询字符串参数(query参数)。
* */
// 这个内置模块引入的是一个对象，该对象有很多有用的方法，最具代表性的是 parse()
let qs = require('querystring')

// 创建服务对象（服务员）
let server = http.createServer(function (request , response) {
  //让服务员开始干活，获取客人点的菜单
  /*
  * (1)request:请求对象，里面包含着客户端给服务器的“东西”
  * (2)response：响应对象，里面包含着服务器要返回给客户端的“东西”
  * */
  // 获取客户端携带过来的urlencoded编码形式的参数
  let params = request.url.split('?')[1]
  let paramsObj = qs.parse(params)
  let {name , age} = paramsObj

  response.setHeader('content-type','text/html;charset=utf-8')
  response.end(`<h1> 你好${name}，你的年龄是${age}岁 </h1>`)
})

// 指定服务器运行的端口号
server.listen(3000, function (err) {
  if (!err) console.log('服务器连接成功！')
  else console.log(err);
})



/* let http = require('http')
let server = http.createServer(function (request , response){
  response.end('<h1> ok </h1>')
})
http.listen(3000,function (err){
  if (!err) console.log('success');
  else console.log(err);
}) */