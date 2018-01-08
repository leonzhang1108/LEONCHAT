import React from 'react'
import { Icon } from 'antd'
import 'style/components/pullDownLoading'

const PullDownLoading = props => (
  <div className="pull-down-loading-wraper">
    <Icon type='loading'/>
    <span className="pull-down-loading-text">data is loading</span>
  </div>
)

export default PullDownLoading