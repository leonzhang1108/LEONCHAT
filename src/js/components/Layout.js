import { Flex } from 'antd'
import React from 'react'
import 'style/components/layout'
const Layout = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <Flex justify="center" className="layout-flex">
          <WrappedComponent {...this.props} />
        </Flex>
      )
    }
  }
}
export default Layout