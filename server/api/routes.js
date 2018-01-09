import sql from '../sql'

const getHistory = async(ctx, next) => {
  // console.log(ctx.cookies.get('name'))
  const list = await sql.getHistory()
  ctx.body = list.map(item => ({
    user: {
      name: item.name,
      id: ''
    },
    content: item.content
  }))
}


module.exports = {
  getHistory
}