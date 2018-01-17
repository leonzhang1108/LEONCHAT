
import { ActivityIndicator } from 'antd'
import 'style/components/chat-menu-loading'

const ChatMenuLoading = () => (
  <div className='chat-loading-wrapper'>
    <ActivityIndicator size='large' />
  </div>
)

module.exports = ChatMenuLoading
