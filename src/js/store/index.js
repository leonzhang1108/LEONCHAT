import { observable, action } from 'mobx'
import { createSocket } from 'socket'
import { getHistory } from 'api'

class Store {
  // 被观察者
  @observable user
  @observable socket
  @observable chatHistory = []
  page

  clearLocal = () => {
    this.socket = null
    this.user = null
    this.page = null
    this.chatHistory = []
  }

  getHistory = async page => await getHistory(page)

  @action doLogin = async name => {
    this.user = {
      name,
      id: Date.now() * Math.random()
    }

    this.socket = createSocket(name)

    const { list, page } = await this.getHistory(this.page)
    this.chatHistory = list
    this.page = page
  }

  @action pullDownRefreshHistory = async() => {
    if(this.page === 0) return
    const { list, page } = await this.getHistory(this.page)
    this.chatHistory.unshift(...list)
    this.page = page
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