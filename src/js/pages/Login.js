
import 'style/pages/login'
import { InputItem, List, Flex, Button, WingBlank, WhiteSpace, Modal } from 'antd'
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

  doLogin = async() => {
    const { name } = this.state
    if(name) {
      const { store, history } = this.props
      await store.doLogin(name)
      store.changePageTo('chat', history)
      return
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
    const { loginPage, common } = this.props.store.locale

    alert(this.props.store.name, loginPage.logoutCheck, [
      { text: common.cancel, onPress: () => console.log('cancel') },
      { text: common.ok, onPress: this.doLogout }
    ])
  }

  inputFocus = () => {
    const { socket } = this.props.store
    !socket && this.loginInput.focus()
  }

  componentDidMount = this.inputFocus

  componentDidUpdate = this.inputFocus

  render() {
    
    const { store } = this.props
    const { error } = this.state
    const { loginPage } = store.locale

    let renderDom = (
      <WingBlank className="w80">
        <InputItem ref={el => this.loginInput = el} className='login-input' placeholder={loginPage.nickname} onChange={this.handleChange} error={error} >
          <i className="icon iconfont icon-human font-base-color"></i>
        </InputItem>
        <WhiteSpace size='xl' />
        <Button type="primary" onClick={this.doLogin}>{loginPage.login}</Button>
      </WingBlank>
    )

    if(store.socket) renderDom = <WingBlank className="w80"><Button type="primary" onClick={this.showAlert}>{loginPage.logout}</Button></WingBlank>

    return renderDom
  }
}

export default Layout(Login)