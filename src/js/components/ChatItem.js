import React from 'react'
import 'style/components/chat-item'
import avatar from 'img/avatar/avatar'

const ChatItem = props => {
  const { name, content } = props
  let chatItem
  let contentWrapper = (
    <div className='chat-content-wrapper'>
      <div className='chat-nickname'>{name}</div>
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