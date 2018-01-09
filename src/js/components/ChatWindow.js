import React from 'react'
import ReactDOM from 'react-dom'
import ChatItem from 'components/ChatItem'
import PullToRefresh from 'components/ChatPullToRefresh'
import 'style/components/chat-window'
import { observer, inject } from 'mobx-react'
import { InputItem, Button } from 'antd'

@inject("store")
@observer
class ChatWindow extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    value: '',
    error: false
  }

  handleChange = value => this.setState({ value, error: !value })

  setStateAsync = state => new Promise(resolve => this.setState(state, resolve))

  doSend = async () => {
    const { value } = this.state
    const { input } = this.refs
    const { addChatHistoryAndSend } = this.props.store
    if(value) {
      addChatHistoryAndSend(value)
      await this.setStateAsync({value: '', error: false})
      input.state.value = ''
    } else {
      await this.setStateAsync({error: true})
    }
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    let ptr = ReactDOM.findDOMNode(this.ptr)
    ptr.scrollTop = ptr.scrollHeight
  }

  render() {
    const { user, store } = this.props
    const { chatHistory } = store
    const { error } = this.state
    return (
      <div className="chat-wrapper">
        <div className="chat-welcome">{`welcome, ${user.name}`}</div>
        <div className="chat-history-wrapper">
          <PullToRefresh ref={el => this.ptr = el}>
          <div className="chat-history">
            {
              chatHistory.map((chatItem, i) => {
                if(chatItem.user) {
                  const { id } = chatItem.user
                  return id === user.id 
                    ? <ChatItem key={i} {...chatItem} self /> 
                    : <ChatItem key={i} {...chatItem} friends />
                } else {
                  return <ChatItem key={i} {...chatItem} /> 
                }
              }) 
            }
          </div>
          </PullToRefresh>
          <InputItem ref="input" onChange={this.handleChange} className="chat-input" placeholder="Input" error={error}/>
          <Button onClick={this.doSend} className="chat-button" type="primary" inline size="small" style={{ marginRight: '4px' }}>send</Button>
        </div>
      </div>
    )
  }
}

export default ChatWindow