const express = require('express')
const app = express()
app.use(express.static(__dirname+'/public'))

app.get('/test',(req, res)=>{
  let {callback} = req.query
  let personArr = [{name:'bobo',age:20},{name:'hello',age:19}]
  res.send(`${callback}(${JSON.stringify(personArr)})`)   //把字符串/数组转化成 JSON字符串或数组
})

app.listen(3000,(err)=>{
  if (err) console.log(err)
  else {
    console.log('用jsonp解决跨域问题');
  }
})