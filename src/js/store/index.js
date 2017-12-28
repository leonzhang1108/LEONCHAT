
import { observable, action } from 'mobx'

class Store {
  // 被观察者
  @observable name ='leon'
  @observable socket 

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

}

export default new Store()