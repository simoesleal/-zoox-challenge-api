const BusinessError = require("../../exceptions/BusinessError");
const {
  HTTP_BAD_REQUEST,
  TECHNICAL_SUPPORT_MESSAGE,
} = require("../utils/Constants");
const { getPrimaryKey } = require("../../database/index");

class CityValidation {
  /**
   * @description Validate the parameters to create a new State.
   * @param {string} name
   * @param {string} stateId
   * @throws {BusinessError} Throws an object with httpStatus, the error message and the error code.
   * @returns {json} Returns an object with the information cleaned and validated.
   */
  async validateInsertCity(name, stateId) {
    if (!name) {
      throw new BusinessError(
        "CITY-PARAMETER",
        `O nome da Cidade é um campo obrigatório. ${TECHNICAL_SUPPORT_MESSAGE}.`,
        HTTP_BAD_REQUEST
      );
    }
    if (!stateId) {
      throw new BusinessError(
        "CITY-PARAMETER",
        `O Estado é um campo obrigatório. ${TECHNICAL_SUPPORT_MESSAGE}.`,
        HTTP_BAD_REQUEST
      );
    } else {
      stateId = getPrimaryKey(stateId);
    }
    const createdAt = new Date();
    const updateAt = createdAt;
    return { name, stateId, createdAt, updateAt };
  }
  /**
   * @description Validate the parameters to create a new State.
   * @param {string} name
   * @param {string} abbreviation
   * @param {string} region
   * @throws {BusinessError} Throws an object with httpStatus, the error message and the error code.
   * @returns {json} Returns an object with the information cleaned and validated.
   */
  async validateUpdateCity(name, stateId) {
    if (!name) {
      throw new BusinessError(
        "CITY-PARAMETER",
        `O nome do Estado é um campo obrigatório. ${TECHNICAL_SUPPORT_MESSAGE}.`,
        HTTP_BAD_REQUEST
      );
    }
    if (!stateId) {
      throw new BusinessError(
        "CITY-PARAMETER",
        `A Estado é um campo obrigatório. ${TECHNICAL_SUPPORT_MESSAGE}.`,
        HTTP_BAD_REQUEST
      );
    } else {
      stateId = getPrimaryKey(stateId);
    }
    const updateAt = new Date();
    return { name, stateId, updateAt };
  }
}

module.exports = new CityValidation();
