import React from 'react'
import { Flex, Icon } from 'antd'
import 'style/components/loading'

const style = {
  height: '100%',
  justifyContent: 'center'
}

const Loading = ({ isLoading, error }) => {
  let res = null
  isLoading && (res = <Icon type='loading'/>)
  error && (res = 'Sorry, there was a problem loading the page.')
  return res ? <Flex style={style}>{res}</Flex> : null 
}

export default Loading