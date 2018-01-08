import socketio from 'socket.io'
import { addHistory } from '../sql'
import { log } from '../util'

const createSocket = (httpServer, store) => {
  const io = socketio.listen(httpServer)
  io.on('connection', socket => {
    // 上线
    socket.on('online', user => {
      log(`${user.name} is online`, 'green')
      // 发送所有人 包括自己
      io.emit('send', {
        msg: `${user.name} is online. `
      })
    })
    
    // 下线
    socket.on('offline', user => {
      log(`${user.name} is offline`, 'gray')
      // 发送所有人 不包括自己
      socket.broadcast.emit('send', {
        msg: `${user.name} is offline. `
      })
    })

    // 发送信息
    socket.on('send', res => {
      const { user } = res
      log(`${user.name}: ${res.content}`, 'green')
      addHistory(res)
      socket.broadcast.emit('send', res)
    })

    // 断开连接
    socket.on('disconnect', msg => log(msg, 'red'))
  })

  return io
}

module.exports = {
  createSocket
}