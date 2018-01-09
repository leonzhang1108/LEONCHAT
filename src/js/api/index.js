import fetch from 'utils/fetch'

const getHistory = () => new Promise((resolve, reject) => {
  fetch.get('/api/getHistory').then(list => {
    resolve(list)
  }).catch(reject)
})

module.exports = {
  getHistory
}