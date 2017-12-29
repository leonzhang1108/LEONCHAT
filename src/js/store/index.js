
import { observable, action } from 'mobx'

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

  @action doLogin = name => {
    this.user = {
      name,
      id: Date.now() * Math.random()
    }
  }

  @action addSocket = socket => {
    this.socket = socket
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