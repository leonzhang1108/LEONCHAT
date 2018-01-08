import Router from 'koa-router'
import sql from '../sql'

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

  router.get('/getHistory', async (ctx, next) => {
    const list = await sql.getHistory()

    ctx.body = list.map(item => ({
      user: {
        name: item.name,
        id: ''
      },
      content: item.content
    }))
  })  

  return router
}


export default {
  init
}