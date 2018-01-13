import Koa from 'koa'
import opn from 'opn'
import path from 'path'
import http from 'http'
import api from './api'
import webpack from 'webpack'
import config from '../config'
import Router from 'koa-router'
import kstatic from 'koa-static'
import convert from 'koa-convert'
import { initTable } from './sql'
import { createSocket } from './socket'
import wdm from 'koa-webpack-dev-middleware'
import whm from 'koa-webpack-hot-middleware'
import historyFallback from 'koa2-history-api-fallback'
import webpackConfig from '../build/webpack.dev.conf.babel'


const port = process.env.PORT || config.dev.port
const staticPath = '../src'
const app = new Koa()
const compiler = webpack(webpackConfig)
const autoOpenBrowser = !!config.dev.autoOpenBrowser
const router = new Router()
const apiRouter = api.init(store)
let store = []


// api
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

app
  .use(router.routes())
  .use(router.allowedMethods())

// history fallback
app.use(historyFallback())

if(process.env.NODE_ENV === 'dev') {
  const devMiddleware = wdm(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  })
  
  const hotMiddleware = whm(compiler, {
    log: () => {}
  })
  
  devMiddleware.waitUntilValid(() => {
    autoOpenBrowser && opn('http://localhost:3000/')
  })
  
  app.use(convert(devMiddleware))
  app.use(convert(hotMiddleware))
}

// 静态
// app.use(kstatic(path.join(__dirname, staticPath)))

// server
const httpServer = http.Server(app.callback())
httpServer.listen(port, err => console.log(err || `Server started on port ${port}`))

// socket.io
createSocket(httpServer, store)

// init database
initTable()
