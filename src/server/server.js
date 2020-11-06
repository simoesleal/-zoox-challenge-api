const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const NODE_ENV = process.env.NODE_ENV
const LOGGER = require('../logger').createLogger('SERVER')
const ApiException = require('../exceptions/ApiException')

class Server {
  constructor() {
    this.express = express()
    this.startServer()
    this.routes()
    this.errorHandler()
  }

  startServer() {
    LOGGER.info('Starting Server')
    if (NODE_ENV === 'development' || NODE_ENV === 'test') {
      this.express.use(morgan('combined'))
    }
    this.express.use(bodyParser.urlencoded({
      extended: true
    }))
    this.express.use(bodyParser.json())
    this.express.use(cors())
    this.express.use(helmet())
  }

  routes() {
    LOGGER.info('Starting Routes')
    this.express.use(
      '/api/v1',
      (req, res, next) => {
        LOGGER.info(`Original Headers: [${JSON.stringify(req.headers)}]`)
        next()
      },
      require('../routes/index')
    )
  }

  errorHandler() {
    LOGGER.info('Starting Error Handler')
    this.express.use((err, req, res, next) => {
      if (err instanceof ApiException) {
        LOGGER.error(
          `Returning error: ${JSON.stringify({ ...err, message: err.message })}`
        )
        return res.status(err.httpStatus || 500).json({
          httpStatus: err.httpStatus,
          message: err.message,
          error: err.error
        })
      } else {
        LOGGER.error({ message: err.message })
        return res.status(500).json({ message: err.message })
      }
    })
  }
}

module.exports = new Server().express