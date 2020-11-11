class ApiException extends Error {
  constructor (httpStatus, message, error) {
    super(message)
    this.httpStatus = httpStatus
    this.error = error
    Error.captureStackTrace(this, ApiException)
  }
}

module.exports = ApiException
