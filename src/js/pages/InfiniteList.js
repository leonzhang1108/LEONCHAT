
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
    visibleData: []
  }

  componentWillMount() {

    let list = []

    for(let i = 0; i < 1000; i++) {
      list.push(i)
    }

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

    const { itemHeight, list } = this.state

    const vh = visibleHeight || this.state.visibleHeight

    const endIndex = startIndex + Math.ceil(vh / itemHeight) + 1

    const visibleData = list.slice(startIndex, endIndex)

    const top = itemHeight * startIndex

    return { startIndex, endIndex, visibleData, top }
  }

  scrollHandler = e => {

    const { itemHeight } = this.state

    const top = Math.floor(e.target.scrollTop / itemHeight)

    const data = this.doCalculate(top)

    this.setState(data)
  }

  render () {
    const { visibleData, contentHeight, top } = this.state

    return (
      <div className='infinite-list-wrapper' onScroll={this.scrollHandler} ref="wrapper"> 
        <div className="infinite-list-ghost" style={{height: contentHeight}}></div>
        <div className='infinite-list' style={{transform: `translate3d(0, ${ top }px, 0)`}}>
          {
            visibleData.map((item, i) => <div className="item" key={i}>{item}</div>)
          }
        </div>
      </div>
      
    )
  }
}

module.exports = Layout(InfiniteList)
