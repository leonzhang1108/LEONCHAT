
import { Icon } from 'antd'
import 'style/components/pullDownLoading'

const PullDownLoading = props => (
  <div className='pull-down-loading-wraper'>
    <Icon type='loading' />
    <span className='pull-down-loading-text'>{props.locale.common.loading}</span>
  </div>
)

module.exports = PullDownLoading
