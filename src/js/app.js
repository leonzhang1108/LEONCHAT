import React from 'react'
import { Layout } from 'antd'
import { load } from 'utils/util'
import HeadRouter from 'components/HeadRouter'
import { Switch, Route } from 'react-router-dom'
import 'style/app'
const { Content }  = Layout


class App extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="container">
        <HeadRouter />
        <Content className='components'>
          <Switch>
            <Route exact path="/" component={load('Index')}/>
            <Route exact path="/login" component={load('Login')}/>
            <Route exact path="/chat" component={load('Chat')}/>
            <Route component={load('NoMatch')} />
          </Switch>
        </Content>
      </div>
    )
  }
}

export default App