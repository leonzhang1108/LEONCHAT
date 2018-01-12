import ChatMenu from './ChatMenu'
import 'style/components/app-layout'

const AppLayout = ({ children }) => (
  <div className='app-wraper'>
    <ChatMenu />
    {children}
  </div>
)

export default AppLayout
