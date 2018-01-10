
import { load } from 'utils/util'
import routers from 'routers'
import TabRouter from 'components/TabRouter'
import { Switch, Route } from 'react-router-dom'
import 'style/app'
import 'font/iconfont'

const renderRoute = (config, index) => <Route exact key={index} path={`/${config.path}`} component={load(config.title)}/>

const App = props => (
  <TabRouter>
    <Switch>
      { routers.map(renderRoute) }
      <Route component={load('NoMatch')} />
    </Switch>
  </TabRouter>
)


export default App