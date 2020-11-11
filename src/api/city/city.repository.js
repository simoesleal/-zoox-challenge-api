const LOGGER = require("../../logger").createLogger("CITY_REPOSITORY");
const camelize = require("camelize");
const { getDb, getPrimaryKey } = require("../../database/index");
const StateService = require("../state/state.service");
class CityRepository {
  /**
   * @description Get the database instance, set the collection and make the database call.
   * @param {string} query
   */
  async getCities(query) {
    LOGGER.info("Entering in method getCities.");
    try {
      const db = await getDb();
      const collection = db.collection("cities");
      const cursor = collection.find(query);
      const arr = [];
      await cursor.forEach((c) => {
        c._id = c._id.toString();
        arr.push(c);
      });
      const response = arr;
      LOGGER.info("Returning response from method getCities.");
      if (response) return camelize(response);
    } catch (error) {
      LOGGER.error(
        `Error on try return the list of cities, details: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * @description Get the database instance, set the collection and make the database call.
   * @param {string} id
   */
  async getCityById(id) {
    LOGGER.info("Entering in method getCityById.");
    try {
      const _id = getPrimaryKey(id);
      const db = await getDb();
      const collection = db.collection("cities");
      const dbResponse = await collection.findOne({ _id: _id });
      const getState = await StateService.getStateById(dbResponse.stateId);
      dbResponse._id = dbResponse._id.toString();
      dbResponse.stateId = dbResponse.stateId.toString();
      dbResponse.state = getState;
      const response = dbResponse;
      LOGGER.info("Returning response from method getCityById.");
      if (response) return camelize(response);
    } catch (error) {
      LOGGER.error(
        `Error on repository, trying to get the city, details: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * @description Get the database instance, set the collection and make the database call.
   * @param {json} payload
   */
  async insertCity(payload) {
    LOGGER.info("Entering in method insertCity.");
    try {
      const db = await getDb();
      const collection = db.collection("cities");
      const dbResponse = await collection.insertOne(payload);
      const response = dbResponse.insertedId;
      LOGGER.info("Returning response from method insertCity.");
      if (response) return camelize(response);
    } catch (error) {
      LOGGER.error(
        `Error on repository, trying to insert a city, details: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * @description Get the database instance, set the collection and make the database call.
   * @param {json} payload
   */
  async updateCity(id, payload) {
    LOGGER.info("Entering in method updateCity.");
    try {
      const _id = getPrimaryKey(id);
      const db = await getDb();
      const collection = db.collection("cities");
      const dbResponse = await collection.updateOne(
        { _id: _id },
        { $set: payload }
      );
      const response = dbResponse.modifiedCount;
      LOGGER.info("Returning response from method updateCity.");
      if (response) return camelize(response);
    } catch (error) {
      LOGGER.error(
        `Error on repository, trying to update a city, details: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * @description Get the database instance, set the collection and make the database call.
   * @param {json} payload
   */
  async deleteCity(id) {
    LOGGER.info("Entering in method deleteCity.");
    try {
      const _id = getPrimaryKey(id);
      const db = await getDb();
      const collection = db.collection("cities");
      const dbResponse = await collection.deleteOne({ _id: _id });
      const response = dbResponse.deletedCount;
      LOGGER.info("Returning response from method deleteCity.");
      if (response) return camelize(response);
    } catch (error) {
      LOGGER.error(
        `Error on repository, trying to delete a city, details: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = new CityRepository();
