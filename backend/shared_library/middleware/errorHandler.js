const logEvents = require('./logEvents')

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}\t${err.message}`, 'errLog.txt')
  next()
}

module.exports = errorHandler
