
import ReactDOM from 'react-dom'
import App from './app'
import store from 'store'
import { Provider } from "mobx-react"
import { BrowserRouter as Router } from "react-router-dom"

FastClick.attach(document.body)

ReactDOM.render(
  <Router>
    <Provider store={store} >
      <App/>
    </Provider>
  </Router>
,document.getElementById("app"))