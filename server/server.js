import Koa from 'koa'
import opn from 'opn'
import path from 'path'
import http from 'http'
import router from './router'
import webpack from 'webpack'
import config from '../config'
import kstatic from 'koa-static'
import convert from 'koa-convert'
import { createSocket } from './util'
import wdm from "koa-webpack-dev-middleware"
import whm from "koa-webpack-hot-middleware"
import webpackConfig from '../build/webpack.dev.conf'
import historyFallback from 'koa2-history-api-fallback'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const port = process.env.PORT || config.dev.port
const staticPath = '../src'
const app = new Koa()
const compiler = webpack(webpackConfig)
const autoOpenBrowser = !!config.dev.autoOpenBrowser

const devMiddleware = wdm(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = whm(compiler, {
  log: () => {}
})

app.use(convert(devMiddleware))
app.use(convert(hotMiddleware))

app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(historyFallback())

devMiddleware.waitUntilValid(() => {
  autoOpenBrowser && process.env.NODE_ENV == 'dev' && opn('http://localhost:3000/')
})


// 静态
app.use(kstatic(path.join(__dirname, staticPath)))

// server
const httpServer = http.Server(app.callback())
httpServer.listen(port, err => console.log(err || `Server started on port ${port}`))

// socket.io
createSocket(httpServer)
