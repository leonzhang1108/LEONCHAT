import path from 'path'
const resolve = dir => path.join(__dirname, '..', dir)

const jsFolders = ['pages', 'utils', 'store', 'socket', 'routers', 'components', 'config']
const jsFolderAlias = {}
jsFolders.forEach(folder => jsFolderAlias[folder] = resolve(`src/js/${folder}`))

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
    extensions: ['.js', '.json', '.scss', '.png'],
    alias: {
      antd: 'antd-mobile',
      style: resolve('src/style'),
      img: resolve('src/img'),
      js: resolve('src/js'),
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
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192&name=./static/img/[hash].[ext]',
    }]
  }
}