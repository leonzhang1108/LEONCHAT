import React from 'react'
import 'style/pages/login'
import { Input, Button } from 'antd'
import { createSocket } from 'socket'
import { observer, inject } from 'mobx-react'

const Search = Input.Search

@inject("store")
@observer
class Login extends React.Component{
   constructor(props) {
     super(props)
   }

   doLogin = name => {
    if(!name) return
    const { store, history } = this.props
    store.changeName(name)
    store.addSocket(createSocket(name))
    history.push(`/chat`)
   }

   doLogout = () => {
    const { store } = this.props
    store.clearSocket()
   }

   render() {
    
    const { store } = this.props

    let renderDom = <Search placeholder="your nickname" onSearch={this.doLogin} enterButton="Login" />
    if(store.socket) renderDom = <Button type="primary" onClick={this.doLogout}>Login out</Button>

    return (
      <div className='login-input-wrap'>
        { renderDom }
      </div>
    )
   }
}

export default Login