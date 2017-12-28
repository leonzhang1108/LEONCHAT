import React from 'react'
import 'style/pages/index'
import { WingBlank, WhiteSpace } from 'antd'

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
)


const Index = props => (
  <div style={{ padding: '15px 0', height: '100%' }}>
    <WingBlank><PlaceHolder /></WingBlank>
    <WhiteSpace size="lg" />
    <WingBlank size="md"><PlaceHolder /></WingBlank>
    <WhiteSpace size="lg" />
    <WingBlank size="sm"><PlaceHolder /></WingBlank>
  </div>
)

export default Index