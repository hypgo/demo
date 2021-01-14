let express = require('express')
let app = express()

app.get('/test',(req, res) => {
  let {callback} = req.query
  console.log(callback);
  let personArr = [{name:'huang',age:30},{name:'yuan',age:20}]
  res.send(`${callback}(${JSON.stringify(personArr)})`)
  // 面试？JSON 和 jsonp有没有关系 ？？  必须有关系
})


app.listen(3000,function (err) {
  if(err)  console.log(err);
  else  console.log('用jquey封装的jsonp');
})