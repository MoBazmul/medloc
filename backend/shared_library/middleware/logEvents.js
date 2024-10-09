const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const path = require('path')
const fsPromises = require('fs').promises
const fs = require('fs')

const logEvents = async(logMsg, logFile) => {
  const dateTime = `${format(new Date('yyyy-MM-dd\tHH-mm-ss'))}`
  const logItem = `${dateTime}\t${uuid()}\t${logMsg}\n`

  try {
    if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFile), logItem)
  } catch(err) {
    console.error(err)
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}`, 'reqLogs.txt')
  next()
}

module.exports = { logEvents, logger }
