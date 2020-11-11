const LOGGER = require("../../logger").createLogger("STATE_SERVICE");
const StateValidation = require("./state.validations");
const StateRepository = require("./state.repository");

class StateService {
  /**
   * @description Get a list of states, the list can be filtered by the query parameter.
   * @param {json} query
   * @returns {array} states
   */
  async getStates(query) {
    LOGGER.info("Entering in method getStates.");
    try {
      const states = await StateRepository.getStates(query);
      LOGGER.info("Returning response from method getStates.");
      return states;
    } catch (error) {
      LOGGER.error(
        `Error while getting the list of states. Message: ${error.message}.`
      );
      throw error;
    }
  }

  /**
   * @description Serach for a state by it id.
   * @param {string} id
   * @returns {json} state
   */
  async getStateById({ id }) {
    LOGGER.info(
      `Entering in methods getStateById, with parameters - state id: [${id}].`
    );
    try {
      const state = await StateRepository.getStateById(id);
      LOGGER.info("Returning response from method getStateById.");
      return state;
    } catch (error) {
      LOGGER.error(
        `Error on service, while getting the state. Message: ${error.message}`
      );
      throw error;
    }
  }

  /**
   * @description Create a new state.
   * @param {string} name
   * @param {string} stateId
   * @returns {} dbresponse
   */
  async insertState({ name, abbreviation, region }) {
    LOGGER.info(
      `Entering in method insertState, with body parameter: name: [${name}], abbreviation: [${abbreviation}] and region: [${region}].`
    );
    try {
      const payload = await StateValidation.validateInsertState(
        name,
        abbreviation,
        region
      );
      LOGGER.info(
        `Parameters after being validated and sanitizated in method validateInsertState, payload: [${JSON.stringify(
          payload
        )}].`
      );
      const dbresponse = await StateRepository.insertState(payload);
      LOGGER.info("Returning response from method insertState.");
      return dbresponse;
    } catch (error) {
      LOGGER.error(
        `Error while trying to unlink a team member. Message: ${error.message}.`
      );
      throw error;
    }
  }

  /**
   * @description Update a state.
   * @param {string} id
   * @param {string} name
   * @param {string} stateId
   * @returns {} dbresponse
   */
  async updateState({ id }, { name, abbreviation, region }) {
    LOGGER.info(
      `Entering in method updateState, with parameter id: [${id}] with body parameter: name: [${name}], abbreviation: [${abbreviation}] and region: [${region}].`
    );
    try {
      const payload = await StateValidation.validateUpdateState(
        name,
        abbreviation,
        region
      );
      LOGGER.info(
        `Parameters after being validated and sanitizated in method validateUpdateState, payload: [${JSON.stringify(
          payload
        )}].`
      );
      const dbresponse = await StateRepository.updateState(id, payload);
      LOGGER.info("Returning response from method updateState.");
      return dbresponse;
    } catch (error) {
      LOGGER.error(
        `Error while trying to unlink a team member. Message: ${error.message}.`
      );
      throw error;
    }
  }

  /**
   * @description Delete a state.
   * @param {string} id
   * @returns {} dbresponse
   */
  async deleteState({ id }) {
    LOGGER.info(
      `Entering in methods deleteState, with parameters - state id: [${id}].`
    );
    try {
      const dbresponse = await StateRepository.deleteState(id);
      LOGGER.info("Returning response from method deleteState.");
      return dbresponse;
    } catch (error) {
      LOGGER.error(
        `Error on service, while deleting the state. Message: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = new StateService();
