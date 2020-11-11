const log4js = require('log4js')
const isDev = process.env.NODE_ENV === 'development'
let logLevel

if (isDev) {
  logLevel = 'debug'
} else {
  logLevel = 'error'
}

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'logs/zoox-api-v1.log',
      maxLogSize: 1048576,
      backups: 25,
      compress: true,
      pattern: 'dd-MM-yyyy'
    },
    console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: `${logLevel}` }
  }
})

class Logger {
  constructor () {
    this.levels = ['error', 'info', 'debug']
  }

  createLogger (loggerName) {
    const LOG = log4js.getLogger(loggerName)
    LOG.level = logLevel
    return LOG
  }
}

module.exports = new Logger()
