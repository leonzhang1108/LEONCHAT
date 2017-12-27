import io from 'socket.io-client'

const createSocket = name => {
  const socket = io.connect('http://localhost:3000')

  socket.on('online', data => {
    console.log(`${data.name} is online`)
  })

  socket.on('offline', data => {
      onsole.log(`${data.name} is offline`)
  })

  socket.emit('online', { name })

  window.onbeforeunload = () => {
    socket.emit('offline', { name })
    socket.disconnect()
  }

  return socket
}

module.exports = {
  createSocket
}