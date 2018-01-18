const Koa = require('koa')
const opn = require('opn')
const api = require('./api')
// const path = require('path')
const http = require('http')
const webpack = require('webpack')
const config = require('../config')
const Router = require('koa-router')
const logger = require('koa-logger')
// const kstatic = require('koa-static')
const convert = require('koa-convert')
const { initTable } = require('./sql')
const { createSocket } = require('./socket')
const wdm = require('koa-webpack-dev-middleware')
const whm = require('koa-webpack-hot-middleware')
const historyFallback = require('koa2-history-api-fallback')
const webpackConfig = require('../build/webpack.dev.conf.babel')
const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')

const port = process.env.PORT || config.dev.port
// const staticPath = '../src'
let store = []
const app = new Koa()
const autoOpenBrowser = !!config.dev.autoOpenBrowser
const router = new Router()
const apiRouter = api.init(store)

app.use(logger())

// api
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

// history fallback
app.use(historyFallback())

if (process.env.NODE_ENV === 'dev') {
  const compiler = webpack(webpackConfig)
  // const dashboard = new Dashboard()
  // compiler.apply(new DashboardPlugin(dashboard.setData))

  const devMiddleware = wdm(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  })

  const hotMiddleware = whm(compiler, {
    log: () => {}
  })

  devMiddleware.waitUntilValid(() => {
    autoOpenBrowser && opn(`http://localhost:${port}/`)
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
