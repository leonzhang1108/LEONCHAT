
import { Flex, Icon } from 'antd'
import 'style/components/loading'

const Loading = ({ isLoading, error }) => {
  let res = null
  isLoading && (res = <Icon type='loading'/>)
  error && (res = 'Sorry, there was a problem loading the page.')
  return res ? <Flex className="loading-center">{res}</Flex> : null 
}

export default Loading