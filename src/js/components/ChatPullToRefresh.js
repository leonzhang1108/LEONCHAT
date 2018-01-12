
import PullDownLoading from 'components/PullDownLoading'
import { PullToRefresh } from 'antd'

class ChatPullToRefresh extends React.Component {
  state = {
    refreshing: false
  }

  setStateAsync = state => new Promise(resolve => this.setState(state, resolve))

  render () {
    const { children, onRefresh, store, className } = this.props
    const { locale, page } = store
    const { common } = locale
    const deactivate = page ? common.deactivate : common.nomore
    const activate = page ? common.activate : common.nomore
    const finish = page ? common.finish : common.nomore
    const release = <PullDownLoading locale={locale} />
    return (
      <PullToRefresh
        className={className}
        style={{
          height: '100%',
          overflow: 'auto'
        }}
        indicator={{ deactivate, activate, finish, release }}
        direction='down'
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
