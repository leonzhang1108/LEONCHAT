import { Menu } from 'antd'

const ChatMenuEl = props => {
  return (
    <Menu
      className='single-foo-menu'
      data={props.initData}
      value={[props.currentPage]}
      level={1}
      onChange={props.onChange}
      height={document.documentElement.clientHeight * 0.6}
    />
  )
}

export default ChatMenuEl
