import React from 'react'
import { Row, Col, Layout } from 'antd'
import { NavLink as Link} from 'react-router-dom'
const { Header }  = Layout

const HeadRouter = props => (
  <Header>
    <Row>
      <Link to="/"><Col span={8}>Index</Col></Link>
      <Link to="/login"><Col span={8}>Login</Col></Link>
      <Link to="/chat"><Col span={8}>Chat</Col></Link>
    </Row>
  </Header>
)

export default HeadRouter