
import { observable, action } from 'mobx'

class Store {
  // 被观察者
  @observable nickname = ''
  @observable socket = ''

  @action changeNickname = val => {
    this.nickname = val
  }

  @action addSocket = socket => {
    this.socket = socket
  }

}

export default new Store()