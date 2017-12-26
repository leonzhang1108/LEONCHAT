import React from 'react'
import { Row, Col, Layout } from 'antd'
import { load } from 'utils/util'
import { HashRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import 'antd/dist/antd.css'
import 'style/app'
const history = createBrowserHistory()
const { Header, Footer, Content }  = Layout

const App = props => (
  <Router>
    <div className="container">
      <Header>
        <Row>
          <Link to="/"><Col span={8}>首页</Col></Link>
          <Link to="/login"><Col span={8}>登录</Col></Link>
          <Link to="/chat"><Col span={8}>聊天</Col></Link>
        </Row>
      </Header>
      <Content className='components'>
        <Route exact path="/" component={load('Index')}/>
        <Route path="/login" component={load('Login')}/>
        <Route path="/chat" component={load('Chat')}/>
      </Content>
    </div>
  </Router>
)
export default App