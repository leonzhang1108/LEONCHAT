import chalk from 'chalk'
import socketio from 'socket.io'

const log = (msg, color = 'white') => {
  console.log(chalk[color](msg))
}

const createSocket = httpServer => {
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
}

module.exports = {
  log, createSocket
}