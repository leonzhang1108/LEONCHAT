
import { ActivityIndicator } from 'antd'

const ChatMenuLoading = props => (
  <div style={{ position: 'absolute', width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
    <ActivityIndicator size="large" />
  </div>
)

export default ChatMenuLoading