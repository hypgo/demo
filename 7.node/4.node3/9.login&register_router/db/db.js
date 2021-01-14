// 该模块用来连接数据库，且判断数据库的链接状态
let mongoose = require('mongoose')
mongoose.set('useCreateIndex',true) //使用一个新的索引创建器

// 用来连接数据库，并检测数据库连接状态的方法
function connectMongo(success,failed) {
  // 1.连接数据库
  mongoose.connect('mongodb://localhost:27017/useInfo',{
    useNewUrlParser:true, //使用一个新的URL解析器，用于解决一些安全性问题
    useUnifiedTopology:true //使用一个统一的新的拓扑结构
  })

  // 2.绑定数据库连接的监听
  mongoose.connection.on('open',function (err) {
    if (err) {
      console.log('数据库连接失败');
      failed('connect failed')
    } else{
      console.log('数据库连接成功');
      success()
    }
  })
}

module.exports = connectMongo