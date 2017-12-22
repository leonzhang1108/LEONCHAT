import chalk from 'chalk'

const log = (msg, color = 'black') => {
  console.log(chalk[color](msg))
}

module.exports = {
  log
}