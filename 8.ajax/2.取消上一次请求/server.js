let express = require('express')
const app = express()

// 暴露静态资源
app.use(express.static(__dirname + '/public'))
// 用于解析post请求体参数 --- 参数的编码类型必须是 urlencoded
app.use(express.urlencoded({extended:true}))

//返回验证码的路由，每当有人请求该路由，该路由就会返回一个1000 - 9999的随机数
app.get('/ajax_code',(req, res)=> {
  setTimeout(()=>{
    let authCode = Math.floor(Math.random()*8999+1000)  //Math.floor(Math.random() * (max - min + 1)) + min
    console.log(authCode);
    res.send(authCode.toString())
  },3000)
})


app.listen(3000,function (err) {
  if (err) console.log(err)
  else {
    console.log('通过这个链接来练习取消上一次请求服务器启动成功：http://localhost:3000/ajax_code.html');
  }
})