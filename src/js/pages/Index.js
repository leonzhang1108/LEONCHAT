import React from 'react'
import { Layout } from 'antd'
import 'style/pages/index'

const { Header, Footer, Content } = Layout

const Index = props => (
  <Layout>
    <Header>index header</Header>
    <Content>index content</Content>
    <Footer>index footer</Footer>
  </Layout>
)

export default Index