import Router from 'koa-router'

const router = new Router()

router.get('/api', function (ctx, next) {
    ctx.body = 'this is api'
})


export default router