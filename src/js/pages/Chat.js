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
  componentDidMount = () => {
    console.log(this.props)
  }
  render() {
    let string = <Button type="primary" onClick={this.toLogin}>click to login</Button>
    let nickname = this.props.store.nickname
    nickname && (string = `welcome ${nickname}`)
    return <div>{string}</div>
  }
}

export default Chat