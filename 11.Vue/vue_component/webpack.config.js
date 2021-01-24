const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // 模式: 生产环境
  // mode: 'production',
  // 入口
  entry: {
    app: resolve(__dirname, 'src/index.js'),
    
  },
  // 出口(打包生成js)
  output: {
    filename: 'static/js/[name].bundle.js',
    path: resolve(__dirname, 'dist')
  },
  // 模块加载器
  module: {
    rules: [
      {
        test: /\.js$/, // 用于匹配文件(对哪些文件进行处理)
        // exclude: /node_modules/,
        include: [resolve(__dirname, 'src')], // 只针对哪些处理
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 预设包: 包含多个常用插件包的一个大包
          }
        }
      },
      // 处理CSS
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'],
      },
      // 处理图片
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
            }}]
      },
      // 处理vue单文件组件模块
      {
        test: /\.vue$/,
        // include: resolve(__dirname, 'src'),
        loader: 'vue-loader'
      },

    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', // 将哪个页面作为模板页面处理(在根目录查找)
      filename: 'index.html' // 生成页面(在output指定的path下)
    }),
    // 确保引入vue插件
    new VueLoaderPlugin(),
    new HotModuleReplacementPlugin()
  ],

  // 配置开发服务器
  devServer: {
    port: 8000,
    open: true,
    // hot: true,
    // quiet: true  // 不做太多日志输出
  },
  // 配置开启source-map调试 ..这个顺序要按照官方文档来配置，不知道版本(webpack-cli降级为3.x)还是顺序问题。。
  devtool: 'eval-cheap-module-source-map',

  // 引入模块解析说明
  resolve: {
    extensions: ['.js', '.vue', '.json'], // import这些文件时，可以省略后缀名，作用 简化编码
    alias: { 
      // 路径别名(简写方式)。 vue$ 正则写法，引入的路径以vue结尾，去找带编译器的版本
      'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配
      '@': resolve(__dirname, 'src'), // 等于 vue_compoent/src
      '@components': resolve(__dirname, 'src/components')
    }
  }
}