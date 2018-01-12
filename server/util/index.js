import chalk from 'chalk'

const log = (msg, color = 'white') => console.log(chalk[color](msg))

module.exports = {
  log
}
