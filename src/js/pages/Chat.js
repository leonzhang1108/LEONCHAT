import React from 'react'
import 'style/pages/chat'
import { Button } from 'antd'
class Chat extends React.Component {
  constructor(props) {
    super(props)
  }
  toLogin = () => {
    this.props.history.push(`/login`)
  }

  render() {
    let string = <Button type="primary" onClick={this.toLogin}>click to login</Button>
    let nickname = this.props.match.params.nickname
    nickname && (string = `welcome ${nickname}`)
    return <div>{string}</div>
  }
}

export default Chat