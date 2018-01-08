import { observable, action } from 'mobx'
import fetch from 'utils/fetch'
import { createSocket } from 'socket'

class Store {
  // 被观察者
  @observable user
  @observable socket
  @observable chatHistory = []

  clearLocal = () => {
    this.socket = null
    this.user = null
    this.chatHistory = []
  }

  addSocket = socket => {
    this.socket = socket
  }

  @action doLogin = name => {
    this.user = {
      name,
      id: Date.now() * Math.random()
    }

    this.socket = createSocket(name)

    fetch.get('/api/getHistory').then(list => {
      this.chatHistory = list
    })
  }

  

  @action clearSocket = () => {
    this.socket.emit('offline', this.user)
    this.socket.disconnect()
    this.clearLocal()
  }

  @action addChatHistory = res => {
    res && this.chatHistory.push(res)
  }

  @action addChatHistoryAndSend = content => {
    const res = {
      content,
      user: this.user
    }
    console.log(res)
    this.chatHistory.push(res)
    this.socket.emit('send', res)
  }

}

export default new Store()