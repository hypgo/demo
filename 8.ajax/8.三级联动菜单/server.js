let express = require('express')
// 当文件夹中只有一个文件，且该文件名为index，则引入时可以只写到文件夹的路径
let db = require('./db')
let citiesModel = require('./model/citiesModel')
const app = express()

db(()=>{
  // 获取中国所有省份信息
  app.get('/get_all_province',function (req,res) {
    citiesModel.find({level:1},{province:1,name:1,_id:0},function (err,data) {
      res.setHeader('Access-Control-Allow-Origin','*')
      if(!err && data){
        res.send({status:1,data})
      }else{
        res.send({status:0,err})
      }
    })
  })

  // 根据（省份编码），获取该省份下的所有市信息
  app.get('/get_cities_by_province', (req, res)=> {
    let {province} = req.query
    citiesModel.find({level:2,province},{city:1,name:1,_id:0},function (err,data) {
      res.setHeader('Access-Control-Allow-Origin','*')
      if(!err && data){
        res.send({status:1,data})
      }else{
        res.send({status:0,err})
      }
    })
  })

  // 根据（省份编码），（市编码）获取该地方下的所有区县信息
  app.get('/get_counties_by_province_and_city', (req, res)=> {
    let {province,city} = req.query
    citiesModel.find({level:3,province,city},{county:1,name:1,_id:0},function (err,data) {
      res.setHeader('Access-Control-Allow-Origin','*')
      if(!err && data){
        res.send({status:1,data})
      }else{
        res.send({status:0,err})
      }
    })
  })
  
  app.listen(3000, function (err) {
    if (err)  console.log(err)
    else console.log('服务器启动成功啦')
    })

  }, (err) => {
    console.log(err);
})