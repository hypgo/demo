// 将数据库想象成别墅
let mongoose = require('mongoose')

// 1.请来一个看门的宝安 ---  引入模式对象
let Schema = mongoose.Schema

// 2.指定进入你家的规则 ---  创建约束对象
let usersRule = new Schema({
  email:{
    type:String,   //是什么类型，数字、字符串
    required:true, //是否必填项
    unique:true    //是否唯一
  },
  nickName:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now()  //默认值
  },
  enable_flag:{
    type:String,
    default:'Y'    
  }
})

// 3.告诉宝安你的规则  ---  创建模型对象
module.exports = mongoose.model('users' , usersRule)  //用于生成某个集合所对应的模型对象