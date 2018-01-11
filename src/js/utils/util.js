import Loadable from 'react-loadable'
import PageLoading from 'components/PageLoading'

const load = component => Loadable({
  loader: () => import(`pages/${component}`),
  loading: PageLoading
})

module.exports = {
  load
}