import React from 'react'
import PullDownLoading from 'components/PullDownLoading'
import ReactDOM from 'react-dom'
import { PullToRefresh, Button } from 'antd'

class ChatPullToRefresh extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  render() {
    return (
      <PullToRefresh
        style={{
          height: '100%',
          overflow: 'auto',
        }}
        indicator={{ 
          deactivate: 'pull down to update',
          activate: 'now release',
          finish: 'finished',
          release: <PullDownLoading/>
        }}
        direction="down"
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true })
          setTimeout(() => this.setState({ refreshing: false }), 1000)
        }}
      >
        {this.props.children}
      </PullToRefresh>
    )
  }
}

export default ChatPullToRefresh