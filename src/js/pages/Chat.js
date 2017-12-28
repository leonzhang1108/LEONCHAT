import React from 'react'
import 'style/pages/chat'
import { Flex, Button } from 'antd'
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
    let string = <Button className="w80" type="primary" onClick={this.toLogin}>click to login</Button>
    let name = this.props.store.name
    name && (string = `welcome ${name}`)
    return <Flex justify='center' style={{ height: '100%', width: '100%' }}>{string}</Flex>
  }
}

export default Chat