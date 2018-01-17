
import { load } from 'utils/util'
import routers from 'routers'
import AppLayout from 'components/AppLayout'
import { Switch, Route } from 'react-router-dom'
import 'style/app'
import 'font/iconfont'

const renderRoute = (config, index) => <Route exact key={index} path={`/${config.path}`} component={load(config.label)} />

const App = () => (
  <AppLayout>
    <Switch>
      {/* all pages */}
      { routers.map(renderRoute) }

      {/* /index => / */}
      <Route exact path='/index' component={load('Index')} />

      {/* 404 */}
      <Route component={load('NoMatch')} />
    </Switch>
  </AppLayout>
)

module.exports = App
