import { Menu, NavBar } from 'antd'
import routers from 'routers'
import ChatMenuEl from './ChatMenuEl'
import ChatMenuLoading from './ChatMenuLoading'
import ChatMenuLangSwitch from './ChatMenuLangSwitch'
import { observer, inject } from 'mobx-react'
import { withRouter} from 'react-router-dom'
import 'style/components/chat-menu'

@inject("store")
@observer
class ChatMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    initData: '',
    show: false
  }

  componentDidMount = () => {
    const { store, location } = this.props
    const { setCurrentPage } = store
    const curr = location.pathname.replace(/\//g, '')
    setCurrentPage(curr || 'index')
  }

  onChange = value => {
    const { store, history } = this.props
    const { setCurrentPage, changePageTo } = store
    const curr = value[0]
    changePageTo(curr, history)
    this.onMaskClick()
  }

  handleClick = e => {
    e.preventDefault() 

    const { bottomTab } = this.props.store.locale

    this.setState({ show: !this.state.show })

    const initData = routers.map(({value}) => ({
      value, label: bottomTab[value]
    }))

    this.setState({ initData })

    // mock for async data loading
    // !this.state.initData && setTimeout(() => {
    //   // todo
    // }, 500)
  }

  onMaskClick = () => this.setState({ show: false })

  switchLang = () => this.props.store.toogleLocale()

  render() {
    const { initData, show } = this.state
    const { locale, currentPage, lang, unreadMsgCount, socket, user } = this.props.store
    const { menu, chat } = locale
    const leftContent = <div><i className="icon iconfont icon-menu"></i><span className="icon-menu-text">{menu.showMenuBtn}</span></div>
    const rightContent = <ChatMenuLangSwitch onClick={this.switchLang} lang={lang} unreadMsgCount={unreadMsgCount}/>

    let titleContent = locale.bottomTab[currentPage]

    currentPage === 'chat' 
    && socket 
    && (titleContent = <div className="chat-welcome inline-ellipsis">{`${chat.welcome}, ${user.name}`}</div>)
    
    return (
      <div className={show ? 'single-menu-active' : ''}>
        <div>
          <NavBar
            leftContent={leftContent}
            rightContent={rightContent}
            mode="light"
            onLeftClick={this.handleClick}
            className="single-top-nav-bar"
          >
            {titleContent}
          </NavBar>
        </div>
        {/* 加载菜单 */}
        {show ? initData ? <ChatMenuEl initData={initData} onChange={this.onChange} currentPage={currentPage}/> : <ChatMenuLoading/> : null}
        {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
      </div>
    )
  }
}

export default withRouter(ChatMenu)