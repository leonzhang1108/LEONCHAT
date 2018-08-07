import App from './app'
import store from 'store'
import { BrowserRouter as Router } from 'react-router-dom'
const { Provider } = MobxReact
FastClick.attach(document.body)

ReactDOM.render(
  <Router>
    <Provider store={store} >
      <App />
    </Provider>
  </Router>
  , document.getElementById('app'))
