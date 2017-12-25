import path from 'path'
import config from '../config'
const resolve = dir => path.join(__dirname, '..', dir)

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
    extensions: ['.js', '.json', '.scss'],
    alias: {
      style: resolve('src/style'),
      img: resolve('src/img'),
      js: resolve('src/js')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  }
}