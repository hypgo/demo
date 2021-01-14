// 专门用于管理展示界面的UI路由

// 引入Router构造函数
const {Router} = require('express')
// 创建一个Router实例，路由器就是一个小型的app
let router = new Router()
// 引入cookie
const cookieParese = require('cookie-parser')
// 引入数据库模板
const usersModel = require('../model/usersModel')
// 引入path模块：node中内置的一个专门用于解决路径问题的库
let {resolve} = require('path')
// 调用cookie
router.use(cookieParese())

const errMsg = {}
// 用于展示登录界面的路由，无其他任何逻辑 --- UI路由
router.get('/login',(req , res)=>{
  // public文件夹没了，用模板打开
  const {email} = req.query
  res.render('login',{errMsg:{email}})
})

// 用于展示注册界面的路由，无其他任何逻辑 --- UI路由
router.get('/register',(req , res)=>{
  res.render('register',{errMsg:{}})
})

// 用于展示用户界面界面的路由，无其他任何逻辑 --- UI路由
router.get('/user_center',(req , res)=>{
  const {_id} = req.cookies
  // 去数据库中找是否有该_id，找到后获取该id对应的nickname
  if (_id) {
    usersModel.findOne({_id}, function (err,data) {
      if (!err && data) {
        // 进入此判断，用户不仅携带着id，且该id有效
        // let {nick_name} = JSON.parse(data)
        res.render('userCenter',{nickName:data.nickName})
        console.log(data);
      } else{
        // 进入此处，与数据库交互式产生了错误，或用户非法篡改了cookie
        res.redirect('http://localhost:3000/login')
      }
    })
  } else{
    // 进入此处：用户cookie过期了；用户清理了浏览器缓存；用户根本没有登录过直接访问了个人中心
    res.redirect('http://localhost:3000/login')
  }
})

// 暴露出去，中间件的思想是函数，用函数的方式暴露，需要的时候调用
module.exports = function () {
  return router
}