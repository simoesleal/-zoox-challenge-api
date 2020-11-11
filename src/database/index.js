const LOGGER = require("../logger").createLogger("DATABASE");
const {
  db: { host, port, database },
} = require("../config/");
const { MongoClient, ObjectId } = require("mongodb");
const mongoOptions = { useNewUrlParser: true };
let _db;
let client;
class Database {
  constructor() {
    this.url = `mongodb://${host}:${port}/`;
  }

  async init() {
    let client = new MongoClient(this.url, mongoOptions);
    if (_db) {
      LOGGER.info(`MongoDB database is already initialized!.`);
      return true;
    } else {
      try {
        await client.connect();
        _db = await client.db(database);
        LOGGER.info(`Connected successfully to MongoDB database.`);
      } catch (error) {
        LOGGER.error(`MondoDB connection failure, details: ${error}.`);
        await client.close();
      } finally {
        //await client.close();
      }
    }
  }

  async getDb() {
    return _db;
  }

  getPrimaryKey(_id) {
    return new ObjectId(_id);
  }
}

module.exports = new Database();
