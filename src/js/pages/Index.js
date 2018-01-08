import React from 'react'
import PullToRefresh from 'components/ChatPullToRefresh'

import 'style/pages/index'

const genData = () => {
  const dataArr = []
  for (let i = 0; i < 5; i++) {
    dataArr.push(i)
  }
  return dataArr
}


class Index extends React.Component {
  

  render() {
    return (
      <PullToRefresh>
        {genData().map(i => (
          <div key={i} style={{ textAlign: 'center', padding: 20 }}>
            pull down {i}
          </div>
        ))}
      </PullToRefresh>
    )
  }
}

export default Index