import { SegmentedControl, WingBlank, WhiteSpace } from 'antd'
import 'style/pages/index'
const { observer, inject } = MobxReact
import Layout from 'components/Layout'

@inject('store')
@observer
class Index extends React.Component {
  onChange = (e) => {
    const { changeLocale } = this.props.store
    const index = e.nativeEvent.selectedSegmentIndex
    changeLocale(index)
  }

  render () {
    const { lang } = this.props.store
    return (
      <WingBlank className='w80'>
        <SegmentedControl
          style={{ height: '50px' }}
          values={['切换到英文', 'Change to Chinese']}
          selectedIndex={lang === 'zh' ? 1 : 0}
          onChange={this.onChange}
        />
        <WhiteSpace size='xl' />
      </WingBlank>
    )
  }
}

module.exports = Layout(Index)
