import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

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
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.css', '.json', '.scss', '.png'],
    alias: {
      antd: 'antd-mobile',
      js: resolve('src/js'),
      img: resolve('src/img'),
      font: resolve('src/font'),
      i18n: resolve('src/i18n'),
      style: resolve('src/style'),
      ...jsFolderAlias
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      favicon: 'src/img/common/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new FriendlyErrorsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // 进度条
    new ProgressBarPlugin(),
    // 公用JS提取
    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'vendor', 
      filename: 'vendor.[hash].js' 
    }),
    // 公用样式提取
    new ExtractTextPlugin('[chunkhash].css'),
    // 加了之后公用框架不用import
    new webpack.ProvidePlugin({
      FastClick: 'fastclick',
      React: 'react',
      i18n: 'i18n'
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader']
      })
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader', 'postcss-loader']
      })
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192&name=./static/img/[hash].[ext]'
    }, {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: [
        'file-loader'
      ]
    }]
  }
}
