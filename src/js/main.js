import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import store from 'store'
import { Provider } from "mobx-react"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <Router>
    <Provider store={store} >
      <App/>
    </Provider>
  </Router>
,document.getElementById("app"))