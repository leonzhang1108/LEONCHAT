import React from 'react'
import ChatItem from 'components/ChatItem'
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

  handleChange = value => this.setState({ value, error: !value  })

  doSend = () => {
    const { value } = this.state
    const { input } = this.refs
    const { addChatHistoryAndSend } = this.props.store
    if(value) {
      addChatHistoryAndSend(value)
      this.setState({value: '', error: false})
      input.state.value = ''
    } else {
      this.setState({ error: true})
    }
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    const { historyForm } = this.refs
    historyForm.scrollTop = historyForm.scrollHeight
  }

  render() {
    const { user, store } = this.props
    const { chatHistory } = store
    const { error } = this.state
    return (
      <div className="chat-wrapper">
        <div className="chat-welcome">{`welcome, ${user.name}`}</div>
        <div className="chat-history-wrapper">
          <div className="chat-history" ref="historyForm">
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
          <InputItem ref="input" onChange={this.handleChange} className="chat-input" placeholder="Input" error={error}/>
          <Button onClick={this.doSend} className="chat-button" type="primary" inline size="small" style={{ marginRight: '4px' }}>send</Button>
        </div>
      </div>
    )
  }
}

export default ChatWindow