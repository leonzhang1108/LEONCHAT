import { NavBar } from 'antd'
import routers from 'routers'
import ChatMenuEl from './ChatMenuEl'
import ChatMenuLoading from './ChatMenuLoading'
import ChatMenuLangSwitch from './ChatMenuLangSwitch'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import 'style/components/chat-menu'

@inject('store')
@observer
class ChatMenu extends React.Component {
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
    const { changePageTo } = store
    const curr = value[0]
    changePageTo(curr, history)
    this.onMaskClick()
  }

  handleClick = e => {
    e.preventDefault()

    const { menuName } = this.props.store.locale

    const initData = routers.map(({value}) => ({ value, label: menuName[value] }))

    initData.push({ value: 'whatthefuck', label: 'the fuck is that???' })

    this.setState({
      initData, show: !this.state.show })

    // mock for async data loading
    // !this.state.initData && setTimeout(() => {
    //   // todo
    // }, 500)
  }

  onMaskClick = () => this.setState({ show: false })

  switchLang = () => this.props.store.toogleLocale()

  render () {
    const { initData, show } = this.state
    const { history, store } = this.props
    const { locale, currentPage, lang, socket, user } = store
    const { menu, chat, common } = locale
    const leftContent = <div><i className='icon iconfont icon-menu' /><span className='icon-menu-text'>{menu.showMenuBtn}</span></div>
    const rightContent = !show ? <ChatMenuLangSwitch onClick={this.switchLang} lang={lang} history={history} /> : null

    let titleContent = locale.menuName[currentPage]

    currentPage === 'chat' &&
    socket &&
    (titleContent = <div className='chat-welcome inline-ellipsis'>{`${chat.welcome}, ${user.name}`}</div>)

    return (
      <div className={show ? 'single-menu-active' : ''}>
        <div>
          <NavBar
            leftContent={leftContent}
            rightContent={rightContent}
            mode='light'
            onLeftClick={this.handleClick}
            className='single-top-nav-bar'
          >
            {titleContent || common.noMatch}
          </NavBar>
        </div>
        {/* 加载菜单 */}
        {show ? initData ? <ChatMenuEl initData={initData} onChange={this.onChange} currentPage={currentPage} /> : <ChatMenuLoading /> : null}
        {show ? <div className='menu-mask' onClick={this.onMaskClick} /> : null}
      </div>
    )
  }
}

export default withRouter(ChatMenu)
