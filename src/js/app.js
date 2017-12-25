import React from 'react'
import { Layout, Input, Select } from 'antd'
const { Header, Content, Footer } = Layout

import 'style/app'
const App = props => (
  <Layout>
    <Header>Header</Header>
    <Content>
    <div className="login-wapper">
      <Input className='login-input' addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
    </div>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
)

export default App