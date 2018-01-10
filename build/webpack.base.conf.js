import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
const resolve = dir => path.join(__dirname, '..', dir)

const jsFolders = ['pages', 'utils', 'store', 'socket', 'routers', 'components', 'config', 'api']
const jsFolderAlias = {}
jsFolders.forEach(folder => jsFolderAlias[folder] = resolve(`src/js/${folder}`))

module.exports = {
  entry: {
    app: './src/js/main.js',
    vendor: ['react', 'react-dom', 'axios', 'mobx', 'mobx-react']
  },
  output: {
    // 打包后文件输出目录  网站根目录
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.css', '.json', '.scss', '.png'],
    alias: {
      antd: 'antd-mobile',
      style: resolve('src/style'),
      img: resolve('src/img'),
      js: resolve('src/js'),
      font: resolve('src/font'),
      i18n: resolve('src/i18n'),
      ...jsFolderAlias
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192&name=./static/img/[hash].[ext]',
    }, {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: [
        'file-loader'
      ]
    }]
  }
}