import React from 'react'
import PullDownLoading from 'components/PullDownLoading'
import { PullToRefresh } from 'antd'

class ChatPullToRefresh extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    refreshing: false
  }

  render() {

    const { children } = this.props

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
        {children}
      </PullToRefresh>
    )
  }
}

export default ChatPullToRefresh