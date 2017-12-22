
import Koa from 'koa'
import opn from 'opn'
import path from 'path'
import http from 'http'
import config from '../config'
import kstatic from 'koa-static'
import socketio from 'socket.io'
import webpack from 'webpack'
import convert from 'koa-convert'
import webpackConfig from './webpack.dev.conf'
import wdm from "koa-webpack-dev-middleware"
import whm from "koa-webpack-hot-middleware"
import { log } from './util'

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

devMiddleware.waitUntilValid(() => {
  autoOpenBrowser && process.env.NODE_ENV == 'dev' && opn('http://localhost:3000/')
})


// 静态
app.use(kstatic(path.join(__dirname, staticPath)))

// app.use(async ctx => {
//   ctx.body = 'test'
// })

const httpServer = http.Server(app.callback()).listen(port, err => {
  console.log(err || `[demo] session is starting at port ${port}`)
})

// socket.io
const io = socketio.listen(httpServer)

io.on('connection', socket => {


  // 上线
  socket.on('online', data => {
    log(`${data.name} is online`, 'green')
    socket.broadcast.emit('online', data)
  })

  socket.on('offline', data => {
    log(`${data.name} is offline`, 'gray')
    socket.broadcast.emit('offline', data)
  })

  socket.on('disconnect', data => {
    log(data)
  })
})
