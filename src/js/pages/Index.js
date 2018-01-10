import { SegmentedControl } from 'antd'
import 'style/pages/index'
import { observer, inject } from 'mobx-react'
import Layout from 'components/Layout'

@inject("store")
@observer
class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isEnglish: true
    }
  }

  onChange = (e) => {
    const { changeLocale } = this.props.store
    const index = e.nativeEvent.selectedSegmentIndex
    changeLocale(index)
  }

  render() {
    return (
      <SegmentedControl
        style={{ width: '80%' }}
        values={['切换到英文', 'Change to Chinese']}
        selectedIndex={this.state.isEnglish ? 1 : 0}
        onChange={this.onChange}
      />
    )
  }
}

export default Layout(Index)