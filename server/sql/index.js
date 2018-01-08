import { query } from './async-db'

const initTable = async () => {
  let sql = `
    CREATE TABLE IF NOT EXISTS chat_history (
      ID int NOT NULL AUTO_INCREMENT, 
      NAME VARCHAR(255), 
      CONTENT VARCHAR(255),
      CREATEDATE datetime NOT NULL DEFAULT NOW(),
      PRIMARY KEY (ID)
    );`
  await query(sql)
}

const addHistory = async ({ user, content }) => {
  let sql = `INSERT INTO chat_history (NAME, CONTENT) values (?, ?);`
  await query(sql, [user.name, content])
}


module.exports = {
  initTable, addHistory
}