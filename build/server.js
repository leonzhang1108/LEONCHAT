import Koa from 'koa'
import opn from 'opn'
import path from 'path'
import http from 'http'
import { log } from './util'
import webpack from 'webpack'
import config from '../config'
import socketio from 'socket.io'
import kstatic from 'koa-static'
import convert from 'koa-convert'
import wdm from "koa-webpack-dev-middleware"
import whm from "koa-webpack-hot-middleware"
import webpackConfig from './webpack.dev.conf'

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


const httpServer = http.Server(app.callback()).listen(port, err => {
  console.log(err || `Server started on port ${port}`)
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
