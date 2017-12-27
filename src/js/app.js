import React from 'react'
import { Layout } from 'antd'
import { load } from 'utils/util'
import HeadRouter from 'components/HeadRouter'
import { HashRouter as Router, Switch, Route, Redirect, NavLink as Link} from 'react-router-dom'
import 'antd/dist/antd.css'
import 'style/app'
const { Content }  = Layout

const App = props => (
  <Router>
    <div className="container">
      <HeadRouter />
      <Content className='components'>
        <Switch>
          <Route exact path="/" component={load('Index')}/>
          <Route exact path="/login" component={load('Login')}/>
          <Route exact path="/chat/" component={load('Chat')}/>
          <Route exact path="/chat/:nickname" component={load('Chat')}/>
          <Route component={load('NoMatch')} />
        </Switch>
      </Content>
    </div>
  </Router>
)
export default App