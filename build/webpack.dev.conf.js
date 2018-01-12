import webpack from 'webpack'
import config from '../config'
import merge from 'webpack-merge'
import baseWebpackConfig from './webpack.base.conf'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import webpackBundleAnalyzer from 'webpack-bundle-analyzer' 

const BundleAnalyzerPlugin = webpackBundleAnalyzer.BundleAnalyzerPlugin

module.exports = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false // remove all comments
      },
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: false
    }),
    new FriendlyErrorsPlugin(),
    // 进度条
    new ProgressBarPlugin(),
    // 公用JS提取
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    // 公用样式提取
    new ExtractTextPlugin('styles.css'),
    // 加了之后公用框架不用import
    new webpack.ProvidePlugin({
      FastClick: 'fastclick',
      PropTypes: 'prop-types',
      React: 'react',
      i18n: 'i18n'
    }),
    // 分析依赖分布
    new BundleAnalyzerPlugin()
  ]
})
