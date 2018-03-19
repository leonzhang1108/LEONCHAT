
import Layout from 'components/Layout'
import 'style/pages/infinite-list'

class InfiniteList extends React.Component {

  state = {
    list: [],
    top: 0,
    contentHeight: 0,
    visibleHeight: 0,
    startIndex: 0,
    endIndex: 0,
    itemHeight: 30,
    visibleData: []
  }

  componentWillMount() {

    let list = []

    for(let i = 0; i < 100000; i++) {
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

  doCalculate (startIndex, visibleHeight) {

    const { itemHeight, list } = this.state

    const vh = visibleHeight || this.state.visibleHeight

    const endIndex = startIndex + Math.ceil(vh / itemHeight)

    const visibleData = list.slice(startIndex, endIndex)

    const top = itemHeight * startIndex

    return { startIndex, endIndex, visibleData, top }
  }

  scrollHandler(e) {

    const { itemHeight } = this.state

    const top = Math.floor(e.target.scrollTop / itemHeight)

    const data = this.doCalculate(top)

    this.setState(data)
  }

  render () {
    const { visibleData, contentHeight, top } = this.state

    return (
      <div className='infinite-list-wrapper' onScroll={this.scrollHandler.bind(this)} ref="wrapper"> 
        <div className="infinite-list-ghost" style={{height: contentHeight}}></div>
        <div className='infinite-list' style={{top}}>
          {
            visibleData.map((item, i) => <div className="item" key={i}>{item}</div>)
          }
        </div>
      </div>
      
    )
  }
}

module.exports = Layout(InfiniteList)
