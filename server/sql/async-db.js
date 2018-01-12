import mysql from 'mysql'
import { mysqlConfig } from '../config'

const pool = mysql.createPool(mysqlConfig)

let query = (sql, values) => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) {
      reject(err)
    } else {
      connection.query(sql, values, (err, rows) => {
        err ? reject(err) : resolve(rows)
        connection.release()
      })
    }
  })
})

module.exports = {
  query
}
