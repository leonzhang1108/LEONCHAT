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
          this.setState({ refreshing: true })
          const res = await onRefresh()
          this.setState({ refreshing: !res })
        }}
      >
        {children}
      </PullToRefresh>
    )
  }
}

export default ChatPullToRefresh