
import { observable, action } from 'mobx'

class Store {
  // 被观察者
  @observable name
  @observable socket
  @observable chatHistory = [{
    name: 'leonzhang',
    content: 'fuck the regulation'
  },{
    name: 'leonzhang',
    content: 'fuck the regulation'
  },{
    name: 'leonzhang',
    content: 'fuck the regulation'
  },{
    name: 'leonzhang',
    content: 'fuck the regulation'
  },{
    name: 'leonzhang',
    content: 'fuck the regulation'
  },{
    name: 'leonzhang',
    content: 'fuck the regulation'
  },{
    name: 'leonzhang',
    content: 'fuck the regulation'
  },{
    name: 'leonzhang',
    content: 'fuck the regulation'
  }]

  @action changeName = val => {
    this.name = val
  }

  @action addSocket = socket => {
    this.socket = socket
  }

  @action clearSocket = () => {
    this.socket.emit('offline', { name: this.name })
    this.socket.disconnect()
    this.socket = null
    this.name = null
  }

  @action addChatHistory = res => {
    this.chatHistory.push(res)
  }

  @action addChatHistoryAndSend = content => {
    const res = {
      content,
      name: this.name
    }
    this.chatHistory.push(res)
    this.socket.emit('send', res)
  }

}

export default new Store()