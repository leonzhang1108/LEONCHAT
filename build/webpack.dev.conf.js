var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/js/main.js'
  },
  output: {
    // 打包后文件输出目录  网站根目录
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {}
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  node: {fs: "empty"},
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    // 进度条
    new ProgressBarPlugin()
  ]
}