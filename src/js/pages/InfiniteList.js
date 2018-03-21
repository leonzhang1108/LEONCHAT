
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
    // item高度
    itemHeight: 30,
    // 可见列表
    visibleData: [],
    // 上下预加载个数
    offset: 10,
    // 间隔
    interval: 2,
    // 缓存
    indexFindTop: [],
    startIndexCache: [],
    endIndexCache: []
  }

  componentWillMount() {

    let list = []

    const { itemHeight } = this.state

    for(let i = 0; i < 1000; i++) {
      list.push({
        val: i,
        height: this.randomBoolean() ? 60 : 30
      })
    }

    const contentHeight = list.reduce((p, c) => p + c.height, 0)

    this.setState({ list, contentHeight })
  }

  randomBoolean = () => Math.random() - 0.5 > 0

  componentDidMount() {

    const visibleHeight = this.refs.wrapper.clientHeight

    const data = this.doCalculate(0)

    this.setState({ 
      visibleHeight,
      ...data
    })
  }

  doCalculate = startIndex => {

    const { list, offset } = this.state

    const innerOffset = startIndex - offset

    startIndex = innerOffset > 0 ? innerOffset : 0

    let endIndex = this.findEndIndex(startIndex) + offset * 2

    const visibleData = list.slice(startIndex, endIndex)

    const top = this.findTopByIndex(startIndex)
    
    return { visibleData, top }
  }

  findTopByIndex = index => {

    if(!index) return 0

    const { list, indexFindTop, interval } = this.state

    // 取缓存
    if (indexFindTop[index])
      return indexFindTop[index]

    let top = 0
    let start = 0

    if (index - interval >= 0) {
      const cache = indexFindTop[index - interval]
      start = index - interval
      
      if (cache) {
        // 缓存中拿
        top = cache
      } else {
        // 遍历取值
        for(let i = 0; i < start; i++) 
          top += list[i].height
      }
    }
    
    for(let i = start; i < index; i++) 
      top += list[i].height

    indexFindTop[index] = top

    this.setState({ indexFindTop })

    return top
  }

  findIndexByTop = (top, index = 0) => {

    const { list } = this.state

    while (top > 0) {
      let i = index + 1
      if (i !== list.length) {
        top -= list[++index].height
      } else {
        break
      }
    }

    return index
  }

  findStartIndex = top => {

    let { startIndexCache } = this.state

    if (startIndexCache[top]) return startIndexCache[top]

    let left = top
    let right = top

    while (left > 0) {
      if (startIndexCache[--left]) break
    }

    while (right < startIndexCache.length) {
      if (startIndexCache[++right]) break
    }
    
    // 如果前后都有缓存 且值差==1 则index为小的那个
    if (left !== 0 && right !== startIndexCache.length) {
      const dValue = startIndexCache[right] - startIndexCache[left]
      
      if (dValue === 1) {

        const startIndex = startIndexCache[left]
        startIndexCache[top] = startIndex

        this.setState({
          startIndexCache
        })

        return startIndex
      } 

    }

    // 计算startIndex
    const startIndex = this.findIndexByTop(top)

    // 加入缓存
    startIndexCache[top] = startIndex

    this.setState({
      startIndexCache
    })

    return startIndex
  }

  findEndIndex = startIndex => {
    let { visibleHeight, endIndexCache } = this.state

    if (endIndexCache[startIndex]) 
      return endIndexCache[startIndex]

    visibleHeight = visibleHeight || this.refs.wrapper.clientHeight

    // 计算endIndex
    const endIndex = this.findIndexByTop(visibleHeight, startIndex)

    // 加入缓存
    endIndexCache[startIndex] = endIndex

    this.setState({
      endIndexCache
    })

    return endIndex
  }

  scrollHandler = e => {

    const { interval } = this.state

    const startIndex = this.findStartIndex(e.target.scrollTop)

    startIndex % interval === 0 && this.setState(this.doCalculate(startIndex))

  }

  render () {
    const { visibleData, contentHeight, top } = this.state

    return (
      <div className='infinite-list-wrapper' onScroll={this.scrollHandler} ref="wrapper"> 
        <div className="infinite-list-ghost" style={{height: contentHeight}}></div>
        <div className='infinite-list' style={{transform: `translate3d(0, ${ top }px, 0)`}}>
          { visibleData.map((item, i) => {
            const style = {height: `${item.height}px`, lineHeight: `${item.height}px`}
            return <div className="item" key={i} style={style}>{`item-${item.val}`}</div>
          }) }
        </div>
      </div>
    )
  }
}

module.exports = Layout(InfiniteList)
