import React from 'react'
import 'style/pages/login'
import { Input } from 'antd'
import { observer, inject } from 'mobx-react'

const Search = Input.Search

@inject("store")
@observer
class Login extends React.Component{
   constructor(props) {
     super(props)
   }
   onSearch = nickname => {
     const { store, history } = this.props
     store.changeNickname(nickname)
     history.push(`/chat`)
   }
   render() {
     return (
      <div className='login-input-wrap'>
        <Search
          placeholder="your nickname"
          onSearch={this.onSearch}
          enterButton="Login"
        />
      </div>
     )
   }
}

export default Login