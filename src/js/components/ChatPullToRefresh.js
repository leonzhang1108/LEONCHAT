import React from 'react'
import PullDownLoading from 'components/PullDownLoading'
import ReactDOM from 'react-dom'
import { PullToRefresh, Button } from 'antd'

const genData = () => {
  const dataArr = []
  for (let i = 0; i < 20; i++) {
    dataArr.push(i)
  }
  return dataArr
}


class ChatPullToRefresh extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight - 50,
      data: [],
    };
  }

  componentDidMount() {
    const height = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height,
      data: genData(),
    }), 0);
  }

  render() {
    return (
      <PullToRefresh
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        indicator={{ 
          deactivate: 'pull down to update',
          activate: 'now release',
          finish: 'finished',
          release: <PullDownLoading/>
        }}
        direction="down"
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true })
          setTimeout(() => this.setState({ refreshing: false }), 1000)
        }}
      >
        {this.props.children}
      </PullToRefresh>
    )
  }
}

export default ChatPullToRefresh