import { Badge } from 'antd'
import 'style/components/unread-badge'

const UnreadBadge = props => (
    <Badge className="count-badge" text={props.unreadMsgCount} overflowCount={99} />
)

export default UnreadBadge