import React from 'react'
import 'style/pages/login'
import { Input } from 'antd'

const Search = Input.Search

class Login extends React.Component{
   constructor(props) {
     super(props)
   }
   onSearch = nickname => {
     this.props.history.push(`/chat/${nickname}`)
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