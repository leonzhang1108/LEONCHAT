import Router from 'koa-router'
import sql from '../sql'
import routes from './routes'

let init = store => {
  const router = new Router()

  router.get('/getHistory', routes.getHistory)

  return router
}


export default {
  init
}