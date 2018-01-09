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

  setStateAsync = state => new Promise(resolve => this.setState(state, resolve))

  render() {

    const { children, onRefresh } = this.props

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
        onRefresh={async () => {
          this.setStateAsync({ refreshing: true })
          await onRefresh()
          this.setStateAsync({ refreshing: false })
        }}
      >
        {children}
      </PullToRefresh>
    )
  }
}

export default ChatPullToRefresh