import webpack from 'webpack'
import config from '../config'
import merge from 'webpack-merge'
import baseWebpackConfig from './webpack.base.conf.babel'
import webpackBundleAnalyzer from 'webpack-bundle-analyzer' 
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

const BundleAnalyzerPlugin = webpackBundleAnalyzer.BundleAnalyzerPlugin

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 分析依赖分布
    new BundleAnalyzerPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false // remove all comments
      },
      compress: {
        warnings: false
      }
    })
  ]
})
