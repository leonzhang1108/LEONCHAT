import chalk from 'chalk'
import socketio from 'socket.io'

const log = (msg, color = 'white') => console.log(chalk[color](msg))

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
      socket.broadcast.emit('send', res)
    })

    // 断开连接
    socket.on('disconnect', user => {
      log(user)
    })
  })

  return io
}

module.exports = {
  log, createSocket
}