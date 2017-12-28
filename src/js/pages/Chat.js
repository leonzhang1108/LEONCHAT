import React from 'react'
import 'style/pages/chat'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'

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
    let string = <Button type="primary" onClick={this.toLogin}>click to login</Button>
    let name = this.props.store.name
    name && (string = `welcome ${name}`)
    return <div>{string}</div>
  }
}

export default Chat