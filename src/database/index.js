const LOGGER = require('../logger').createLogger('DATABASE')
const { db: { host, port, database } } = require('../config/')
const { MongoClient, ObjectId } = require("mongodb");
const mongoOptions = { useNewUrlParser: true}

class Database {
    constructor() {
        this.url = `mongodb://${host}:${port}/`
        this._db = null
    }

    async init() {
        if (this._db) {
            LOGGER.info(`MongoDB database is already initialized!.`) 
            return true
        } else {
            const client = new MongoClient(this.url, mongoOptions)
            try {
                await client.connect()
                this._db = await client.db(`${database}`)
                LOGGER.info(`Connected successfully to MongoDB database.`) 
            } catch (error) {
                LOGGER.error(`MondoDB connection failure, details: ${error}.`)
                await client.close()
            } finally {
                await client.close()
            }
        }
    }

    getDb() {
        if (!_db) {
            this.init()
        } return _db
    }
 
    getPrimaryKey(_id) {
        return new ObjectId(_id)
    }
}

module.exports = new Database()