import Router from 'koa-router'
import routes from './routes'

const init = store => {
  const router = new Router()

  router.get('/getHistory', routes.getHistory)

  return router
}


export default {
  init
}