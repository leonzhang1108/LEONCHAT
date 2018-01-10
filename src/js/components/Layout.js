import { Flex } from 'antd'

import 'style/components/layout'
const Layout = WrappedComponent => props => (
  <Flex justify="center" className="layout-flex">
    <WrappedComponent {...props} />
  </Flex>
)
export default Layout