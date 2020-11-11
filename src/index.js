const LOGGER = require("./logger").createLogger("ROOT SERVER");
const Server = require("./server");
const Database = require("./database");
const config = require("./config");
const bluebird = require("bluebird");

const PORT = process.env.ZOOX_CHALLENGE_API_PORT || config.api.port;

global.Promise = bluebird;

Database.init();

Server.listen(PORT, () => {
  LOGGER.info(`Server is running on PORT=${PORT}`);
});
