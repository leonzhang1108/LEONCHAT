
import 'style/pages/chat'
import ChatWindow from 'components/ChatWindow'
import { Button } from 'antd'
import Layout from 'components/Layout'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Chat extends React.Component {
  toLogin = () => {
    const { history, store } = this.props
    const { changePageTo } = store
    changePageTo('login', history)
  }

  render () {
    const { clickToLogin } = this.props.store.locale.chat
    let component = <Button className='w80' type='primary' onClick={this.toLogin}>{clickToLogin}</Button>
    let user = this.props.store.user
    user && (component = <ChatWindow />)
    return component
  }
}

module.exports = Layout(Chat)
