import Loadable from 'react-loadable'
import PageLoading from 'components/PageLoading'

const load = component => Loadable({
  loader: () => import(`pages/${component}`),
  loading: PageLoading
})

class Storage {
  
  storage = window.localStorage
  ms

  constructor(ms = 'test') {
    this.ms = ms
  }
  
  set = (key, value) => {
    let mydata = this.storage.getItem(this.ms)
    if(!mydata){
      this.init()
      mydata = this.storage.getItem(this.ms)
    }
    mydata = JSON.parse(mydata)
    mydata.data[key] = value
    this.storage.setItem(this.ms, JSON.stringify(mydata))
    return mydata.data
  }

  get = key => {
    let mydata = this.storage.getItem(this.ms)
    if(!mydata) return false
    mydata = JSON.parse(mydata)
    return mydata.data[key]
  }

  remove = key => {
    let mydata = this.storage.getItem(this.ms)
    if(!mydata) return false
    mydata = JSON.parse(mydata)
    delete mydata.data[key]
    storage.setItem(ms, JSON.stringify(mydata))
    return mydata.data
  }

  clear = () => this.storage.removeItem(this.ms)

  init = () => this.storage.setItem(this.ms,'{"data":{}}')
}

module.exports = {
  load,
  storage: new Storage()
}