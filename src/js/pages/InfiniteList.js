
import Layout from 'components/Layout'
import 'style/pages/infinite-list'

class InfiniteList extends React.Component {

  state = {
    // 总列表
    list: [],
    // 可视区域top
    top: 0,
    // 数据总高度
    contentHeight: 0,
    // 可见高度
    visibleHeight: 0,
    // 可视起始index
    startIndex: 0,
    // 可视终止index
    endIndex: 0,
    // item高度
    itemHeight: 30,
    // 可见列表
    visibleData: [],
    // 上下预加载个数
    offset: 10
  }

  componentWillMount() {

    let list = []

    for(let i = 0; i < 10000; i++) list.push(i)

    this.setState({ list })
  }

  componentDidMount() {

    const { list } = this.state

    const contentHeight = list.length * 30

    const visibleHeight = this.refs.wrapper.clientHeight

    const data = this.doCalculate(0, visibleHeight)

    this.setState({
      contentHeight,
      visibleHeight,
      ...data
    })
  }

  doCalculate = (startIndex, visibleHeight) => {

    const { itemHeight, list, offset } = this.state

    const vh = visibleHeight || this.state.visibleHeight

    const innerOffset = startIndex - offset

    startIndex = innerOffset > 0 ? innerOffset : 0

    let endIndex = startIndex + Math.ceil(vh / itemHeight) + offset * 2

    endIndex = innerOffset < 0 ? endIndex + innerOffset : endIndex

    const visibleData = list.slice(startIndex, endIndex)

    const top = itemHeight * startIndex

    return { startIndex, endIndex, visibleData, top }
  }

  scrollHandler = e => {

    const { itemHeight } = this.state

    const top = Math.floor(e.target.scrollTop / itemHeight)

    top % 2 === 0 && this.setState(this.doCalculate(top))

  }

  render () {
    const { visibleData, contentHeight, top } = this.state

    return (
      <div className='infinite-list-wrapper' onScroll={this.scrollHandler} ref="wrapper"> 
        <div className="infinite-list-ghost" style={{height: contentHeight}}></div>
        <div className='infinite-list' style={{transform: `translate3d(0, ${ top }px, 0)`}}>
          { visibleData.map((item, i) => <div className="item" key={i}>{`item-${item}`}</div>) }
        </div>
      </div>
    )
  }
}

module.exports = Layout(InfiniteList)
