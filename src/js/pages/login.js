import React from 'react'
import 'style/pages/login'
import { Input } from 'antd'
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
     
    const { store, history } = this.props
    store.changeNickname(name)
    store.addSocket(createSocket(name))
    history.push(`/chat`)

   }
   render() {
     return (
      <div className='login-input-wrap'>
        <Search
          placeholder="your nickname"
          onSearch={this.doLogin}
          enterButton="Login"
        />
      </div>
     )
   }
}

export default Login