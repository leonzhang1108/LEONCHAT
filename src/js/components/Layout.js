import { Flex } from 'antd'
import React from 'react'
import 'style/components/layout'
const Layout = WrappedComponent => props => (
  <Flex justify="center" className="layout-flex">
    <WrappedComponent {...props} />
  </Flex>
)
export default Layout