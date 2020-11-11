const LOGGER = require("../../logger").createLogger("STATE_SERVICE");
const StateValidation = require("./state.validations");
const StateRepository = require("./state.repository");

class StateService {
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
