
import { observable, action } from 'mobx'

class Store {
  // 被观察者
  @observable nickname = ''

  @action changeNickname = (val) => {
    this.nickname = val
  }

}

export default new Store()