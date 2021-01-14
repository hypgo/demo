let express = require('express')
const app = express()

// 暴露静态资源
app.use(express.static(__dirname + '/public'))
// 用于解析post请求体参数 --- 参数的编码类型必须是 urlencoded
app.use(express.urlencoded({extended:true}))

app.get('/ajax_jq',(req, res)=> {
  console.log('发get请求来了')
  console.log(req.query);
  res.send('发来了get请求，我收到了')
})

app.post('/ajax_jq',(req, res)=> {
  console.log('发post请求来了')
  console.log(req.body);
  res.send('发来了post请求，我收到了')
})

app.listen(3000,function (err) {
  if (err) console.log(err)
  else {
    console.log('通过这个链接来用jQuery封装ajax：http://localhost:3000/ajax_jq.html');
  }
})