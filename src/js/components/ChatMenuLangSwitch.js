import UnreadBadge from 'components/UnreadBadge'
import 'style/components/chat-menu-lang-switch'
const ChatMenuLangSwitch = props => (
  <div className='top-right-btn-wraper'>
    <UnreadBadge history={props.history} />
    <i className={`icon iconfont icon-switch-${props.lang}`} onClick={props.onClick} />
  </div>
)

export default ChatMenuLangSwitch
