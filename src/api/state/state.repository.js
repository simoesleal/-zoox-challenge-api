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
      LOGGER.info("Returning response from method getStateById.");
      if (response) return camelize(response);
    } catch (error) {
      LOGGER.error(
        `Error on repository, trying to get the country, details: ${error.message}`
      );
      throw error;
    }
  }

  async insertState(payload) {
    LOGGER.info("Entering in method insertState.");
    try {
      const db = await getDb();
      const collection = db.collection("states");
      const state = await collection.insertOne(payload);
      console.log("state", state.ops);
      console.log("state", state.insertedId);
      const response = state.insertedId;
      LOGGER.info("Returning response from method insertState.");
      if (response) return camelize(response);
    } catch (error) {
      LOGGER.error(
        `Error on repository, trying to insert a state, details: ${error.message}`
      );
      throw error;
    }
  }

  async updateState(id, payload) {
    LOGGER.info("Entering in method updateState.");
    try {
      const _id = getPrimaryKey(id);
      console.log('_id', _id);
      const db = await getDb();
      const collection = db.collection("states");
      const state = await collection.updateOne({ _id: _id }, { $set: payload });
      console.log("state", state.modifiedCount);
      const response = state.modifiedCount;
      LOGGER.info("Returning response from method updateState.");
      if (response) return camelize(response);
    } catch (error) {
      LOGGER.error(
        `Error on repository, trying to update a state, details: ${error.message}`
      );
      throw error;
    }
  }

  async deleteState(id) {
    LOGGER.info("Entering in method deleteState.");
    try {
      const _id = getPrimaryKey(id);
      const db = await getDb();
      const collection = db.collection("states");
      const state = await collection.deleteOne({ _id: _id });
      console.log("state", state.deletedCount);
      const response = state.deletedCount;
      LOGGER.info("Returning response from method deleteState.");
      if (response) return camelize(response);
    } catch (error) {
      LOGGER.error(
        `Error on repository, trying to delete a state, details: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = new StateRepository();
