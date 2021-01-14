let express = require('express')

let app = express()
app.use(express.static(__dirname+'/public'))

/*  原理：
1、浏览器里面有个ajax引擎，为6257，你向服务器3000发起请求
2、服务器3000，给你一个6257的请求头，还给你一张“通行证”，表示允许跨域
3、浏览器看到你的通行证，就允许你进来了
*/

app.get('/test',(req, res) => {
  let personArr = [{name:'huang',age:30},{name:'yuan',age:20}]
  //Access-Control-Allow-Origin == 允许远程跨域；自家的网址
  res.setHeader('Access-Control-Allow-Origin','http://localhost:6257') 
  res.send(personArr)
})

app.listen(3000,function (err) {
  if(err)  console.log(err);
  else  console.log('用cors解决跨域');
})