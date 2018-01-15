
import Layout from 'components/Layout'
import 'style/pages/no-match'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class NoMatch extends React.Component {
  render () {
    const { common } = this.props.store.locale

    return (
      <div className='no-match-wraper'>
        <i className='icon iconfont icon-404 font-404-icon'/>
        <div>{common.noMatch}</div>
      </div>
    )
  }
}

export default Layout(NoMatch)
