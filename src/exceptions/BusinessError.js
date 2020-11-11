class BusinessError extends Error {
  constructor (code, message, httpStatus) {
    super(message)
    this.code = code
    this.httpStatus = httpStatus
    Error.captureStackTrace(this, BusinessError)
  }
}

module.exports = BusinessError
