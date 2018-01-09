import fetch from 'utils/fetch'

const getHistory = page => new Promise((resolve, reject) => {
  fetch.get('/api/getHistory', {
    page
  }).then(list => {
    resolve(list)
  }).catch(reject)
})

module.exports = {
  getHistory
}