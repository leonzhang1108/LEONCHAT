import Router from 'koa-router'

let init = store => {
  const router = new Router()

  router.get('/', (ctx, next) => {
    ctx.body = {
      msg: store
    }
  })

  router.get('/add', (ctx, next) => {
    // console.log(ctx.cookies.get('name'))
    store.push('test')
    ctx.body = {
      msg: store
    }
  })

  return router
}


export default {
  init
}