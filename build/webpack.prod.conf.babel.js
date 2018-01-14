import webpack from 'webpack'
import config from '../config'
import merge from 'webpack-merge'
import baseWebpackConfig from './webpack.base.conf.babel'

module.exports = merge(baseWebpackConfig, {
  plugins: [
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
