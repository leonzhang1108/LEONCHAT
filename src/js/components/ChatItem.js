import React from 'react'
import 'style/components/chat-item'
import avatar from 'img/avatar/avatar'

const ChatItem = props => {
  const { user, content, msg } = props
  
  let chatItem = (
    <div className="msg-item-wrapper">
      <div className="msg-item">{msg}</div>
    </div>
  )

  let contentWrapper = (
    <div className='chat-content-wrapper'>
      <div className='chat-nickname'>{user && user.name}</div>
      <div className="chat-content">{content}</div>
    </div>
  )

  if(props.friends) {
    chatItem = (
      <div className='chat-item friends'>
        <img className='chat-avatar' src={avatar}/>
        {contentWrapper}
      </div>
    )
  }

  if(props.self) {
    chatItem = (
      <div className='chat-item self'>
        {contentWrapper}
        <img className='chat-avatar' src={avatar}/>
      </div>
    )
  }

  return chatItem
}

export default ChatItem