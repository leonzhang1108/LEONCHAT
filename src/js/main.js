import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './pages/hello'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000')
socket.on('s2c', data => {
  console.log(data)
  socket.emit('c2s', {my:'data'})
})


ReactDOM.render(<Hello/>, document.getElementById("app"))