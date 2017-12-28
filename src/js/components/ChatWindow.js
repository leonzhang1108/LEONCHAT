import React from 'react'
import ChatItem from 'components/ChatItem'
import 'style/components/chat-window'
import { observer, inject } from 'mobx-react'

@inject("store")
@observer
class ChatWindow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, store } = this.props
    const { chatHistory } = store
    return (
      <div className="chat-wrapper">
        <div className="chat-welcome">{`welcome, ${name}`}</div>
        <div className="chat-history">
          {
            chatHistory.map(
              (chatItem, i) => chatItem.name === name 
                  ? <ChatItem key={i} {...chatItem} self /> 
                  : <ChatItem key={i} {...chatItem} friends />) 
          }
        </div>
        
      </div>
    )
  }
}

export default ChatWindow