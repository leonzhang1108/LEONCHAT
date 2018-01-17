import ChatMenu from './ChatMenu'
import 'style/components/app-layout'

const AppLayout = ({ children }) => (
  <div className='app-wraper'>
    <ChatMenu />
    {children}
  </div>
)

module.exports = AppLayout
