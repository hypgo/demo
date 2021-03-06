const { resolve } = require('path'); //node内置核心模块，用来设置路径。
const HtmlWebpackPlugin = require('html-webpack-plugin'); //用plugin插件打包html文件
module.exports = {
  entry: ['./src/js/index.js','./src/index.html'],   // 入口文件配置（简写）
/*完整写法：
entry:{
  main:'./src/js/app.js'
}
*/

  output: {                     // 输出配置
    filename: './js/built.js',      // 输出文件名
    path: resolve(__dirname, 'build')   //输出文件路径配置
  },

  mode: 'development',   //开发环境(二选一)
  // mode: 'production',   //生产环境(二选一)
  
  // 所有的loader都要在module对象中的rules属性
  // rules是一个数组，数组中的每一个对象就是一个loader
  // loader特点：下载后无需引入，只需声明
  module:{
    rules:[
      // 解析less(不完美)
      {
        test: /\.less$/, // 检查文件是否以.less结尾（检查是否是less文件）
        use: [  // 数组中loader执行是从下到上，从右到左顺序执行
          'style-loader', // 创建style标签，添加上js中的css代码
          'css-loader',   // 将css以commonjs方式整合到js文件中
          'less-loader'   // 将less文件解析成css文件
        ]},
        
      //js语法检查 
      {
        test: /\.js$/,  //只检测js文件
        exclude: /node_modules/,  //排除node_modules文件夹
        enforce: "pre",  //提前加载使用
        use: [ "eslint-loader" ]  //使用eslint-loader解析
      },

      /* // js语法转换  
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }, */

      // js语法转换(ES5->ES5)-更优方法
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [ '@babel/preset-env',{
                  useBuiltIns: 'usage',  // 按需引入需要使用polyfill
                  corejs: { version: 3 }, // 解决corejs的warn报错
                  targets: { // 指定兼容性处理哪些浏览器
                    "chrome": "58",
                    "ie": "9"
                  }}]
            ],
            cacheDirectory: true, // 开启babel缓存
          }
        }
      },

      // 使用url-loade处理样式文件中的图片
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',  //url-loader和file-loader是两兄弟。
            options: {
              limit: 8192, // 8kb --> 8kb以下的图片会转base64处理
              outputPath: 'images', // 决定文件本地输出路径
              publicPath: 'images/',  // 决定图片的url路径(启动服务器时)
              name: '[hash:8].[ext]' // 修改文件名称 [hash:8] hash值取8位,[ext] 文件扩展名
            },
          },
        ],
      },
      // 使用html-loader处理HTML中的标签资源（图片）
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      // 使用file-loader处理其他资源（不是样式图片，less，而是字体、音视频等乱七八糟）
      {
        test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,  // 处理其他资源
        loader: 'file-loader',
        options: {
          outputPath: 'media',  // 输出文件名
          name: '[hash:8].[ext]'
        }
      }
    ]
  },
  //配置plugins插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以当前文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
    })
  ],
  // 配置自动化编译
  devServer: {
	  open: true, // 自动打开浏览器
	  compress: true, // 启动gzip压缩
    port: 3000, // 端口号
    hot: true   // 开启热模替换功能 HMR
    },
  devtool: 'eval-cheap-module-source-map' 
}
