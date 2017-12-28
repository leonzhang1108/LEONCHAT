import React from 'react'
import 'style/pages/chat'
import { load } from 'utils/util'
import ChatWindow from 'pages/ChatWindow'
import { Flex, Button } from 'antd'
import Layout from 'components/Layout'
import { observer, inject } from 'mobx-react'


load('ChatWindow')
@inject("store")
@observer
class Chat extends React.Component {
  constructor(props) {
    super(props)
  }
  toLogin = () => {
    this.props.history.push(`/login`)
  }
  render() {
    let component = <Button className="w80" type="primary" onClick={this.toLogin}>click to login</Button>
    let name = this.props.store.name
    name && (component = <ChatWindow name={name}/>)
    return component
  }
}

export default Layout(Chat)