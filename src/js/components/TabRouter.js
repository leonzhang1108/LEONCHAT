
import { TabBar } from 'antd'
import routers from 'routers'
import { NavLink as Link, withRouter} from 'react-router-dom'
import { observer, inject } from 'mobx-react'

@inject("store")
@observer
class TabRouter extends React.Component {

  renderItem = config => {

    const { children, location, history, store } = this.props
    const { pathname } = location
    const { bottomTab } = store.locale
    return (
      <TabBar.Item
        title={bottomTab[config.key]}
        key={config.path}
        icon={<div className={`${config.title}-icon`} />}
        selectedIcon={<div className={`${config.title}-selected-icon`} />}
        selected={pathname === `/${config.path}`}
        onPress={() => { history.push(`/${config.path}`) }}
      >
        { children }
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