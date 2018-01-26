import ChatItem from 'components/ChatItem'
import ChatPullToRefresh from 'components/ChatPullToRefresh'
import 'style/components/chat-window'
const { observer, inject } = MobxReact
import { InputItem, Button } from 'antd'

@inject('store')
@observer
class ChatWindow extends React.Component {
  state = {
    value: '',
    error: false
  }

  sendListener = res => {
    const { addChatHistory, addUnread } = this.props.store

    addChatHistory(res)
    this.scrollToBottom()
    // 如果在其他页面 添加未读数
    window.location.pathname !== '/chat' && addUnread()
  }

  componentDidMount = () => {
    const { socket, clearUnread } = this.props.store

    // 不重复添加监听
    socket && !socket._callbacks.$send && socket.on('send', this.sendListener)

    this.input.focus()
    this.scrollToBottom()
    clearUnread()
  }

  handleChange = value => this.setState({ value, error: !value })

  setStateAsync = state => new Promise(resolve => this.setState(state, resolve))

  doSend = async () => {
    const { value } = this.state
    const { addChatHistoryAndSend } = this.props.store
    if (value) {
      addChatHistoryAndSend(value)
      await this.setStateAsync({value: '', error: false})
      this.input.state.value = ''
    } else {
      await this.setStateAsync({error: true})
    }
    this.scrollToBottom()
    this.input.focus()
  }

  scrollToBottom = () => {
    if (!this.ptr) return
    let ptr = ReactDOM.findDOMNode(this.ptr)
    ptr.scrollTop = ptr.scrollHeight
  }

  onRefresh = async () => {
    const { pullDownRefreshHistory } = this.props.store
    await pullDownRefreshHistory()
  }

  inputVisible = () => setTimeout(this.scrollToBottom, 800)

  render () {
    const { store } = this.props
    const { chatHistory, user } = store
    const { error } = this.state
    const { chat } = store.locale

    return (
      <div className='chat-history-wrapper'>
        <ChatPullToRefresh
          className='chat-pull-to-refresh'
          ref={el => this.ptr = el}
          onRefresh={this.onRefresh}
          store={this.props.store}
        >
          {
            chatHistory.map((chatItem, i) => {
              if (chatItem.user) {
                const { id } = chatItem.user
                return id === user.id
                  ? <ChatItem key={i} {...chatItem} self />
                  : <ChatItem key={i} {...chatItem} friends />
              } else {
                return <ChatItem key={i} {...chatItem} />
              }
            })
          }
        </ChatPullToRefresh>
        <div className='chat-input-wraper'>
          <InputItem
            ref={el => this.input = el}
            onFocus={this.inputVisible}
            onChange={this.handleChange}
            className='chat-input'
            placeholder={chat.chatInputPlaceholder}
            error={error}
          />
          <Button
            onClick={this.doSend}
            className='chat-button'
            type='primary'
            inline
            size='large'
          >
            {chat.send}
          </Button>
        </div>
      </div>
    )
  }
}

module.exports = ChatWindow
