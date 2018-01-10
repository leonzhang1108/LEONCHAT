
import { Modal } from 'antd'
import 'style/components/chat-item'
import avatar from 'img/avatar/avatar'

const operation = Modal.operation

const ChatItem = props => {
  const { user, content, msg } = props

  const alert = msg => operation([{text: msg}])
  
  let chatItem = (
    <div className="msg-item-wrapper" onClick={() => alert(msg)}>
      <div className="txt inline-ellipsis">{msg}</div>  
    </div>
  )

  let contentWrapper = (
    <div className='chat-content-wrapper'>
      <div className='chat-nickname'>{user && user.name}</div>
      <div className="chat-content" onClick={() => alert(content)}>{content}</div>
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