
import Koa from 'koa'
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

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const port = process.env.PORT || config.dev.port
const staticPath = '../src'
const app = new Koa()
const compiler = webpack(webpackConfig)

const devMiddleware = wdm(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = whm(compiler, {
  log: () => {}
})

app.use(convert(devMiddleware))
app.use(convert(hotMiddleware))


// 静态
app.use(kstatic(path.join(__dirname, staticPath)))

// app.use(async ctx => {
//   ctx.body = 'test'
// })

const httpServer = http.Server(app.callback()).listen(port, err => {
  console.log(err || `[demo] session is starting at port ${port}`)
})

const io = socketio.listen(httpServer)

io.sockets.on('connection', socket => {
  socket.emit('s2c', { hello: 'world' })
  socket.on('c2s', data => {
    console.log(data)
  })
})
