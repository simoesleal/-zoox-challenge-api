const LOGGER = require("../../logger").createLogger("STATE_REPOSITORY");
const camelize = require("camelize");
const { getDb, getPrimaryKey } = require("../../database/index");
const projectState = { _id: 1, name: 1, abbreviation: 1 };

class StateRepository {
  async getStates(query) {
    LOGGER.info("Entering in method getStates.");
    try {
      const db = await getDb();
      const states = db.collection("states");
      const cursor = states.find(query).project(projectState);
      const arr = [];
      await cursor.forEach((c) => {
        c._id = c._id.toString();
        arr.push(c);
      });
      const response = arr;
      LOGGER.info("Returning response from method getStates.");
      if (response) return camelize(response);
    } catch (error) {
      LOGGER.error(
        `Error on try return the list of states, details: ${error.message}`
      );
      throw error;
    }
  }

  async getStateById(id) {
    LOGGER.info("Entering in method getStateById.");
    try {
      const _id = getPrimaryKey(id);
      const db = await getDb();
      const collection = db.collection("states");
      const state = await collection.findOne({ _id: _id });
      state._id = state._id.toString();
      const response = state;
      LOGGER.info("Returning response from method getState.");
      if (response) return camelize(response);
    } catch (error) {
      LOGGER.error(
        `Error on repository, trying to get the country, details: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = new StateRepository();
