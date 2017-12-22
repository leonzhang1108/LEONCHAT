import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000')
let name = Math.random()

socket.emit('online', { name })

socket.on('online', data => {
  console.log(`${data.name} is online`)
})

socket.on('offline', data => {
  console.log(`${data.name} is offline`)
})

window.onbeforeunload = () => {
  socket.emit('offline', { name })
  socket.disconnect()
}


ReactDOM.render(<App/>, document.getElementById("app"))