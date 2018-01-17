import { observable, action } from 'mobx'
import { createSocket } from 'socket'
import { getHistory } from 'api'
import { storage } from 'utils/util'

class Store {
  // 被观察者
  @observable user
  @observable socket
  @observable lang = storage.get('lang') || 'en'
  @observable locale = i18n[this.lang]
  @observable chatHistory = []
  @observable unreadMsgCount = 0
  @observable currentPage = 'index'
  page

  clearLocal = () => {
    this.socket = null
    this.user = null
    this.page = null
    this.chatHistory = []
    this.unreadMsgCount = 0
  }

  getHistory = async page => getHistory(page)

  @action doLogin = async name => {
    this.user = {
      name,
      id: Date.now() * Math.random()
    }

    this.socket = createSocket(name)

    const { list, page } = await this.getHistory(this.page)

    // 如果有历史记录 底加个标签
    list.length && list.push({ msg: this.locale.chat.historyChat })

    this.chatHistory = list
    this.page = page
  }

  @action pullDownRefreshHistory = async () => {
    if (this.page === 0) return
    const { list, page } = await this.getHistory(this.page)
    this.chatHistory.unshift(...list)
    this.page = page
  }

  @action clearSocket = () => {
    this.socket.emit('offline', this.user)
    this.socket.disconnect()
    this.clearLocal()
  }

  @action addChatHistory = res => res && this.chatHistory.push(res)

  @action addChatHistoryAndSend = content => {
    const res = {
      content,
      user: this.user
    }
    this.chatHistory.push(res)
    this.socket.emit('send', res)
  }

  @action changeLocale = index => {
    this.lang = index === 1 ? 'zh' : 'en'
    this.locale = i18n[this.lang]
    storage.set('lang', this.lang)
  }

  @action toogleLocale = () => {
    this.lang = this.lang === 'zh' ? 'en' : 'zh'
    this.locale = i18n[this.lang]
    storage.set('lang', this.lang)
  }

  @action clearUnread = () => this.unreadMsgCount = 0

  @action addUnread = () => this.unreadMsgCount++

  @action setCurrentPage = page => this.currentPage = page

  @action changePageTo = (page, history) => {
    history.push(`/${page}`)
    this.currentPage = page
  }
}

module.exports = new Store()
