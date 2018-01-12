
import Layout from 'components/Layout'
import 'style/pages/no-match'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class NoMatch extends React.Component {
  render () {
    const { common } = this.props.store.locale
    return <div>{common.noMatch}</div>
  }
}

export default Layout(NoMatch)
