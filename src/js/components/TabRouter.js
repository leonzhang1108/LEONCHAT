
import { TabBar } from 'antd'
import routers from 'routers'
import UnreadBadge from 'components/UnreadBadge'
import { withRouter} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import 'style/components/tab-router'

@inject("store")
@observer
class TabRouter extends React.Component {

  constructor(props) {
    super(props)
  }

  renderItem = config => {

    const { children, location, history, store } = this.props
    const { pathname } = location
    const { bottomTab } = store.locale
    const { unreadMsgCount } = store

    const icon = config.value === 'chat' 
              ? <UnreadBadge unreadMsgCount={unreadMsgCount}/> 
              : <div></div>
    return (
      <TabBar.Item
        title={bottomTab[config.value]}
        key={config.path}
        icon={icon}
        selectedIcon={<div className={`${config.label}-selected-icon`} />}
        selected={pathname === `/${config.path}`}
        onPress={() => { history.push(`/${config.path}`) }}
      >
        { pathname === `/${config.path}` ? children : null }
      </TabBar.Item>
    )
  }

  render() {
    return (
      <TabBar
        unselectedTintColor='#ebebef'
        tintColor='#33A3F4'
        barTintColor='white'
      >
        { routers.map(this.renderItem) }  
      </TabBar>
    )
  }
}

export default withRouter(TabRouter)