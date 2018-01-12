import sql from '../sql'

const getHistory = async (ctx, next) => {
  // console.log(ctx.cookies.get('name'))
  const { page } = ctx.query
  const res = await sql.getHistory(page)
  res.list = res.list.map(item => ({
    user: {
      name: item.name,
      id: ''
    },
    content: item.content
  }))

  ctx.body = res
}

module.exports = {
  getHistory
}
