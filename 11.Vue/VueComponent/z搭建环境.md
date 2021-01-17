## 1. 初始化项目
    1). 生成package.json
        yarn init -y

    2). 创建入口js: src/index
        console.log('Hello Webpack!')
        document.getElementById('root').innerHTML = '<h1>Hello222</h1>'

    3). 创建页面文件: index.html
        <div id="root"></div>

## 2. webpack基本使用
    1). 下载依赖包 webpack-cli(提供命令，干活的人)；html-webpack-plugin 打包html文件的
        yarn add -D webpack webpack-cli  
        yarn add -D html-webpack-plugin

    2). 创建webpack配置: webpack.config.js   放到根目录下
        const path = require('path')
        const HtmlWebpackPlugin = require('html-webpack-plugin')

        /*
        ES6: export  default  import
        CommonJS: module.exports/exports
        */
        module.exports = {
          // 模式: 生产环境
          mode: 'production',
          // 入口
          entry: {
            app: path.resolve(__dirname, 'src/index.js')
          },
          // 出口(打包生成js)
          output: {
            filename: 'static/js/[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
          },
          // 模块加载器
          module: {
            rules: [

            ]
          },
          // 插件
          plugins: [
            new HtmlWebpackPlugin({
              template: 'index.html',
              filename: 'index.html'
            })
          ]
        }
    
    3). 生成环境打包并运行
        配置打包命令:  "build": "webpack --mode production"
        打包项目: yarn build
        运行打包项目: serve dist

## 3. 开发环境运行
    1). 现在的问题:
        每次修改项目代码后, 必须重新打包, 重新运行
    
    2). 下载依赖包
        yarn add -D webpack-dev-server
    
    3). 配置开发服务器-实时更新自动打包，解决手动编译打包的问题
        devServer: {
          open: true, // 自动打开浏览器
          quiet: true, // 不做太多日志输出
        },
    
    4). 配置开启source-map调试   报错可以显示源文件
        devtool: 'cheap-module-eval-source-map',

    5). 开发环境运行
        配置命令: "dev": "webpack-dev-server --mode development"
        执行命令: yarn dev

## 4. 打包处理 ES6/CSS/图片
    1). 处理ES6
        a. 下载依赖包
            yarn add -D babel-loader @babel/core @babel/preset-env
        b. 配置
            {
              test: /\.js$/,  //用于匹配文件（针对需要处理的文件）
              //exclude: /(node_modules|bower_components)/, 
              include: path.resolve(__dirname, 'src'),  // 只针对哪些文件来处理，比上面的排除法更加精准
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
    
    2). 处理CSS
        a. 下载依赖包
            yarn add -D css-loader style-loader
        b. 配置
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'], // 多个loader从右到左处理，有顺序的
            }

    3). 处理图片
        a. 下载依赖包 （要注意loader的版本，会导致打包图片报错）
            yarn add -D url-loader@2.3.0 file-loader@4.3.0
        b. 配置
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 8192,
                // 相对于output.path。src图片的name
                name: 'static/img/[name].[hash:7].[ext]' 
              }
            }
    4). 测试
        a. 添加图片: src/assets/imgs/logo.png
        b. 添加css: src/assets/css/my.css
            img {
              width: 200px;
              height: 200px;
            }
        c. index.js
            import logo from './assets/imgs/logo.png'
            import  './assets/css/my.css'

            const image = new Image()
            image.src = logo
            document.body.appendChild(image)
            document.getElementById('root').innerHTML = '<h1>Hello222</h1>'

## 5. 搭建vue的环境
    0). 文档:
        https://vue-loader.vuejs.org/zh/

    1). 下载依赖包:
        yarn add vue
        yarn add -D vue-loader vue-template-compiler
    
    2). 配置
        const VueLoaderPlugin = require('vue-loader/lib/plugin')

        {
          test: /\.vue$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'vue-loader'
        }

        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader'],
        }

        new VueLoaderPlugin()

        // 引入模块的解析
        resolve: {
          extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
          alias: { // 路径别名(简写方式)
            'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配
          }
        }
    
    3). 编码: 
        src/App.vue
        src/index.js
        
## 6. 依赖声明
    1. devDenpendencies：开发时依赖：编译CSS
    2. dependencies：依赖声明：去实现界面功能（项目效果）