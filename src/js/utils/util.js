import Loadable from 'react-loadable'
import Loading from 'js/components/Loading'

const load = component => Loadable({
  loader: () => import(`pages/${component}`),
  loading: Loading
})

module.exports = {
  load
}