import React from 'react'
import 'style/pages/login'
import { InputItem, List, Flex, Button, WingBlank, WhiteSpace, Modal } from 'antd'
import { createSocket } from 'socket'
import Layout from 'components/Layout'
import { observer, inject } from 'mobx-react'

const alert = Modal.alert 

@inject("store")
@observer
class Login extends React.Component{
  constructor(props) {
    super(props)
  }

  state = {
    error: false,
    name: ''
  }

  doLogin = () => {
    const { name } = this.state
    if(name) {
      const { store, history } = this.props
      store.changeName(name)
      store.addSocket(createSocket(name))
      this.setState({error: false})
      history.push(`/chat`)
    } else {
      this.setState({error: true})
    }
  }

  doLogout = () => {
    const { store } = this.props
    store.clearSocket()
  }

  handleChange = name => this.setState({ name, error: !name })

  showAlert = () => {
    alert(this.props.store.name, 'Are you sure???', [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      { text: 'Ok', onPress: this.doLogout }
    ])
  }

  render() {
    
    const { store } = this.props
    const { error } = this.state

    let renderDom = (
      <WingBlank className="w80">
        <InputItem placeholder="your nickname" onChange={this.handleChange} error={error} >
          <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
        </InputItem>
        <WhiteSpace size='xl' />
        <Button type="primary" onClick={this.doLogin}>Login</Button>
      </WingBlank>
    )

    if(store.socket) renderDom = <WingBlank className="w80"><Button type="primary" onClick={this.showAlert}>Logout</Button></WingBlank>

    return renderDom
  }
}

export default Layout(Login)