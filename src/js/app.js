import React from 'react'
import { Layout } from 'antd'
const { Header, Content, Footer } = Layout

import 'style/app'
const App = props => (
  <Layout>
    <Header>Header</Header>
    <Content>Content</Content>
    <Footer>Footer</Footer>
  </Layout>
)

export default App