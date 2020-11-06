const LOGGER = require('./logger').createLogger('ROOT SERVER')
const Server = require('./server/server')
const config = require('./config/config')
const bluebird = require('bluebird')

const PORT = process.env.FAST_DELIVERY_API_PORT || config.api.port

global.Promise = bluebird
Server.listen(PORT, () => {
	LOGGER.info(`Server is running on PORT=${PORT}`)
})