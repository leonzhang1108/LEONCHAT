import React from 'react'
import ChatItem from 'components/ChatItem'
import 'style/components/chat-window'

class ChatWindow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name } = this.props
    return (
      <div className="chat-wrapper">
        <div className="chat-welcome">{`welcome, ${name}`}</div>
        <ChatItem />
      </div>
    )
  }
}

export default ChatWindow