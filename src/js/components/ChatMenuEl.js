import { Menu } from 'antd'
import 'style/components/chat-menu-el'

const ChatMenuEl = props => {
  return (
    <Menu
      className='single-foo-menu'
      data={props.initData}
      value={[props.currentPage]}
      level={1}
      onChange={props.onChange}
      height='40px'
    />
  )
}

module.exports = ChatMenuEl
