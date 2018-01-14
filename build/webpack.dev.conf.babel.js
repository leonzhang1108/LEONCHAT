import webpack from 'webpack'
import config from '../config'
import merge from 'webpack-merge'
import baseWebpackConfig from './webpack.base.conf.babel'
import webpackBundleAnalyzer from 'webpack-bundle-analyzer' 

const BundleAnalyzerPlugin = webpackBundleAnalyzer.BundleAnalyzerPlugin

module.exports = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 分析依赖分布
    new BundleAnalyzerPlugin()
  ]
})
