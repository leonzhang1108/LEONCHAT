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

// 向上获取5条
const getHistory = async () => {
  let sql = `SELECT name, content FROM chat_history WHERE id > (SELECT MAX(id) FROM chat_history) - 5;`
  return await query(sql)
}


module.exports = {
  initTable, 
  addHistory,
  getHistory
}