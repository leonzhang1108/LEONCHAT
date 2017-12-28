import { Flex } from 'antd'
import React from 'react'
const Layout = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <Flex justify='center' style={{ height: '100%', width: '100%' }}>
          <WrappedComponent {...this.props} />
        </Flex>
      )
    }
  }
}
export default Layout