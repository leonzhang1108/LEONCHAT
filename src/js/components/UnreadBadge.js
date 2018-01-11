import { Badge } from 'antd'
import { observer, inject } from 'mobx-react'
import 'style/components/unread-badge'

@inject("store")
@observer
class UnreadBadge extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { history, store } = this.props
    const { unreadMsgCount, changePageTo } = store

    return (
      <Badge 
        className="count-badge" 
        text={unreadMsgCount} 
        overflowCount={99} 
        onClick={() => changePageTo('chat', history)}
      />
    )
  }
}
export default UnreadBadge