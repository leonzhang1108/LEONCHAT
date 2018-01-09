import { observable, action } from 'mobx'
import { createSocket } from 'socket'
import { getHistory } from 'api'

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

  getHistory = async() => await getHistory()

  @action doLogin = async name => {
    this.user = {
      name,
      id: Date.now() * Math.random()
    }

    this.socket = createSocket(name)

    this.chatHistory = await this.getHistory()
  }

  @action pullDownRefreshHistory = async() => {
    const history = await this.getHistory()
    this.chatHistory.unshift(...history)
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