
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

    const { children, onRefresh, store, className } = this.props
    const { locale, page } = store
    const { common } = locale
    return (
      <PullToRefresh
        className={className}
        style={{
          height: '100%',
          overflow: 'auto'
        }}
        indicator={{ 
          deactivate: page ? common.deactivate : common.nomore,
          activate: page ? common.activate : common.nomore,
          finish: page ? common.finish : common.nomore,
          release: <PullDownLoading locale={locale}/>
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