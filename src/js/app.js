
import { load } from 'utils/util'
import routers from 'routers'
import ChatMenu from 'components/ChatMenu'
import { Switch, Route } from 'react-router-dom'
import 'style/app'
import 'font/iconfont'

const renderRoute = (config, index) => <Route exact key={index} path={`/${config.path}`} component={load(config.label)}/>

const App = props => (
  <div className='app-wraper'>
    <ChatMenu/>
    <Switch>
      { routers.map(renderRoute) }
      <Route exact path="/index" component={load('Index')}/>
      <Route component={load('NoMatch')} />
    </Switch>
  </div>
)


export default App