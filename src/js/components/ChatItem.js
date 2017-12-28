import React from 'react'
import 'style/components/chat-item'
import avatar from 'img/avatar/avatar'

const ChatItem = props => (
  <div>
    <img src={avatar}/>
    <div className="chat-content">this is chat item</div>
  </div>
)

export default ChatItem