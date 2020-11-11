const LOGGER = require("../../logger").createLogger("CITY_SERVICE");
const CityValidation = require("./city.validations");
const CityRepository = require("./city.repository");

class CityService {
  async getCities(query) {
    LOGGER.info("Entering in method getCities.");
    try {
      const dbResponse = await CityRepository.getCities(query);
      LOGGER.info("Returning response from method getCities.");
      return dbResponse;
    } catch (error) {
      LOGGER.error(
        `Error while getting the list of states. Message: ${error.message}.`
      );
      throw error;
    }
  }

  async getCityById({ id }) {
    LOGGER.info(
      `Entering in methods getCityById, with parameters - city id: [${id}].`
    );
    try {
      const dbResponse = await CityRepository.getCityById(id);
      LOGGER.info("Returning response from method getCityById.");
      return dbResponse;
    } catch (error) {
      LOGGER.error(
        `Error on service, while getting the city. Message: ${error.message}`
      );
      throw error;
    }
  }

  async insertCity({ name, stateId }) {
    LOGGER.info(
      `Entering in method insertCity, with body parameter: name: [${name}], stateId: [${stateId}].`
    );
    try {
      const payload = await CityValidation.validateInsertCity(name, stateId);
      LOGGER.info(
        `Parameters after being validated and sanitizated in method validateInsertCity, payload: [${JSON.stringify(
          payload
        )}].`
      );
      const dbresponse = await CityRepository.insertCity(payload);
      LOGGER.info("Returning response from method insertCity.");
      return dbresponse;
    } catch (error) {
      LOGGER.error(
        `Error while trying to unlink a team member. Message: ${error.message}.`
      );
      throw error;
    }
  }

  async updateCity({ id }, { name, stateId }) {
    LOGGER.info(
      `Entering in method updateCity, with parameter id: [${id}] with body parameter: name: [${name}], stateId: [${stateId}].`
    );
    try {
      const payload = await CityValidation.validateUpdateCity(name, stateId);
      LOGGER.info(
        `Parameters after being validated and sanitizated in method validateUpdateCity, payload: [${JSON.stringify(
          payload
        )}].`
      );
      const dbresponse = await CityRepository.updateCity(id, payload);
      LOGGER.info("Returning response from method updateCity.");
      return dbresponse;
    } catch (error) {
      LOGGER.error(
        `Error while trying to unlink a team member. Message: ${error.message}.`
      );
      throw error;
    }
  }

  async deleteCity({ id }) {
    LOGGER.info(
      `Entering in methods deleteCity, with parameters - state id: [${id}].`
    );
    try {
      const dbresponse = await CityRepository.deleteCity(id);
      LOGGER.info("Returning response from method deleteCity.");
      return dbresponse;
    } catch (error) {
      LOGGER.error(
        `Error on service, while deleting the state. Message: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = new CityService();
