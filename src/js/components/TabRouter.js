import React from 'react'
import { TabBar } from 'antd'
import routers from 'routers'
import { NavLink as Link, withRouter} from 'react-router-dom'

const TabRouter = props => {
  const {children, location, history} = props
  const { pathname } = location

  const renderItem = (config) => (
    <TabBar.Item
      title={config.title}
      key={config.path}
      icon={<div className={`${config.title}-icon`} />}
      selectedIcon={<div className={`${config.title}-selected-icon`} />}
      selected={pathname === `/${config.path}`}
      onPress={() => { history.push(`/${config.path}`) }}
    >
      { pathname === `/${config.path}` ? children : null }
    </TabBar.Item>
  )

  return (
    <TabBar
      unselectedTintColor='#949494'
      tintColor='#33A3F4'
      barTintColor='white'
    >
    { routers.map(renderItem) }  
    </TabBar>
  )
}

export default withRouter(TabRouter)