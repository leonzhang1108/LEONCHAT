import React from 'react'
import 'style/pages/login'
import { InputItem, List, Flex, Button, WingBlank, WhiteSpace, Modal } from 'antd'
import { createSocket } from 'socket'
import { observer, inject } from 'mobx-react'

const alert = Modal.alert 

@inject("store")
@observer
class Login extends React.Component{
  constructor(props) {
    super(props)
  }

  state = { 
    visible: false,
    name: ''
  }

  doLogin = () => {
    const { name } = this.state
    if(!name) return
    const { store, history } = this.props
    store.changeName(name)
    store.addSocket(createSocket(name))
    history.push(`/chat`)
  }

  doLogout = () => {
    const { store } = this.props
    store.clearSocket()
    this.hideModal()
  }

  hideModal = () => this.setState({ visible: false })

  handleChange = name => this.setState({ name })

  showAlert = () => {
    alert('Logout', 'Are you sure???', [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      { text: 'Ok', onPress: this.doLogout }
    ])
  }

  render() {
    
    const { store } = this.props
    const { visible } = this.state

    let renderDom = (
      <WingBlank className="w80">
        <InputItem placeholder="your nickname" onChange={this.handleChange} >
          <div style={{ backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
        </InputItem>
        <WhiteSpace size='xl' />
        <Button type="primary" onClick={this.doLogin}>Login</Button>
      </WingBlank>
    )

    if(store.socket) renderDom = <WingBlank className="w80"><Button type="primary" onClick={this.showAlert}>Logout</Button></WingBlank>

    return (
      <Flex justify='center' style={{ height: '100%', width: '100%' }}>
        { renderDom }
      </Flex>
    )
  }
}

export default Login