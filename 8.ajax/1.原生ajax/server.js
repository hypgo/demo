let express = require('express')
const app = express()

// 暴露静态资源
app.use(express.static(__dirname + '/public'))
// 用于解析post请求体参数 --- 参数的编码类型必须是 urlencoded
app.use(express.urlencoded({extended:true}))

/* 
ajax的get请求和post请求有什么区别？
1、get请求：
  1.1 参数放在请求地址里
  1.2 以查询字符串参数的方式携带
  1.3 参数是urlencoded的编码形式  key=value&key=value

2、post请求：
  2.1 参数放在请求体里（POST请求报文）
  2.2 以请求体参数的方式携带
  2.3 参数是以urlencoded的编码形式  key=value&key=value

3、form-post --- form表达自动将参数变为 urlencoded形式
   ajax-post --- urlencodeed 加了一个特殊的请求头： xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')  才能使key value方式
             --- json形式不用加请求头'{'name':'kebo','age':'40'}'

*/
app.get('/ajax_get',(req, res)=> {
  console.log(req.query);
  res.send('你发来的是get请求，我收到了')
})

app.post('/ajax_post',(req, res)=> {
  console.log(req.body);
  res.send('你发来的是post请求，我收到了')
})

app.listen(3000,function (err) {
  if (err) console.log(err)
  else {
    console.log('通过这个链接来练习：http://localhost:3000/ajax_get.html');
    console.log('通过这个链接来练习：http://localhost:3000/ajax_post.html');
  }
})