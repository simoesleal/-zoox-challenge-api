const LOGGER = require("../../logger").createLogger("STATE_SERVICE");
const StateRepository = require("./state.repository");

class StateService {
  async getStates(query) {
    LOGGER.info("Entering in method getStates.");
    try {
      const countries = await StateRepository.getStates(query);
      LOGGER.info("Returning response from method getStates.");
      return countries;
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
      const country = await StateRepository.getStateById(id);
      LOGGER.info("Returning response from method getStateById.");
      return country;
    } catch (error) {
      LOGGER.error(
        `Error on service, while getting the state. Message: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = new StateService();
