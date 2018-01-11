import 'style/components/chat-menu-lang-switch'
import UnreadBadge from 'components/UnreadBadge'
const ChatMenuLangSwitch = props => (
  <div className="top-right-btn-wraper">
    <UnreadBadge unreadMsgCount={props.unreadMsgCount}/>
    <i className={`icon iconfont icon-switch-${props.lang}`} onClick={props.onClick}></i>
  </div>
)

export default ChatMenuLangSwitch