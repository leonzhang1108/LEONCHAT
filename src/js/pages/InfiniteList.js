import Layout from 'components/Layout'
import 'style/pages/infinite-list'
import { SIGBREAK } from 'constants';

class InfiniteList extends React.Component {

  state = {
    // 总列表，及offsetTop
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
    offset: 0,
    // 间隔
    interval: 2,
    // 缓存
    endIndexCache: []
  }

  randomBoolean = () => Math.random() - 0.5 > 0

  componentWillMount() {

    // init data
    let list = []

    const { itemHeight } = this.state

    for (let i = 0; i < 12300; i++) {
      // randam height
      const height = this.randomBoolean() ? 80 : 30

      list.push({
        val: i,
        height,
        offsetTop: i ? undefined : height
      })
    }

    const contentHeight = list.reduce((p, c) => p + c.height, 0)

    this.setState({ list, contentHeight })
  }

  componentDidMount() {
    // init height & visible data
    const visibleHeight = this.refs.wrapper.clientHeight

    this.setState({ 
      visibleHeight,
      ...this.doCalculate(0)
    })
  }

  calculateOffset = index => {
    let { list } = this.state

    if (index === list.length) return

    // 取缓存
    if (list[index].offsetTop) return list[index].offsetTop
    
    let offsetTop = list[index].height

    offsetTop += this.calculateOffset(index - 1)

    // 添加缓存
    list[index] = {
      ...list[index],
      offsetTop
    }

    this.setState({ list })

    return offsetTop
  }

  doCalculate = startIndex => {

    const { list, offset } = this.state

    const innerOffset = startIndex = startIndex - offset

    startIndex = startIndex > 0 ? startIndex : 0

    let endIndex = this.findEndIndex(startIndex) + offset * 2 + 1

    endIndex = innerOffset < 0 ? endIndex + innerOffset : endIndex

    endIndex = endIndex > list.length ? list.length : endIndex

    const visibleData = list.slice(startIndex, endIndex)

    const top = this.findTopByIndex(startIndex)
    
    return { visibleData, top }
  }

  findTopByIndex = index => index ? this.state.list[index - 1].offsetTop : 0

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
    const { list } = this.state

    let index = 0

    while(index < list.length) {
      !list[index].offsetTop && this.calculateOffset(index)

      if (top < list[index].offsetTop) break

      index++
    }

    return index
  }

  findEndIndex = startIndex => {
    let { visibleHeight, endIndexCache } = this.state

    // 取缓存
    if (endIndexCache[startIndex]) 
      return endIndexCache[startIndex]

    visibleHeight = visibleHeight || this.refs.wrapper.clientHeight

    // 计算endIndex
    const endIndex = this.findIndexByTop(visibleHeight, startIndex)

    // 加入缓存
    endIndexCache[startIndex] = endIndex

    this.setState({ endIndexCache })

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
