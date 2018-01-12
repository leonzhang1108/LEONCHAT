
import { ActivityIndicator } from 'antd'
import 'style/components/chat-menu-loading'

const ChatMenuLoading = () => (
  <div className='chat-loading-wrapper' style={{ height: document.documentElement.clientHeight * 0.6 }}>
    <ActivityIndicator size='large' />
  </div>
)

export default ChatMenuLoading
