const BusinessError = require("../../exceptions/BusinessError");
const {
  HTTP_BAD_REQUEST,
  TECHNICAL_SUPPORT_MESSAGE,
} = require("../utils/Constants");

class StateValidation {
  /**
   * @description Validate the parameters to create a new State.
   * @param {string} name
   * @param {string} abbreviation
   * @param {string} region
   * @throws {BusinessError} Throws an object with httpStatus, the error message and the error code.
   * @returns {json} Returns an object with the information cleaned and validated.
   */
  async validateInsertState(name, abbreviation, region) {
    if (!name) {
      throw new BusinessError(
        "STATE-PARAMETER",
        `O nome do Estado é um campo obrigatório. ${TECHNICAL_SUPPORT_MESSAGE}.`,
        HTTP_BAD_REQUEST
      );
    }
    if (!abbreviation) {
      throw new BusinessError(
        "STATE-PARAMETER",
        `A UF do Estado é um campo obrigatório. ${TECHNICAL_SUPPORT_MESSAGE}.`,
        HTTP_BAD_REQUEST
      );
    }
    if (!region) {
      throw new BusinessError(
        "STATE-PARAMETER",
        `A região do Estado é um campo obrigatório. ${TECHNICAL_SUPPORT_MESSAGE}.`,
        HTTP_BAD_REQUEST
      );
    }
    const createdAt = new Date();
    const updateAt = createdAt;
    return { name, abbreviation, region, createdAt, updateAt };
  }
  /**
   * @description Validate the parameters to create a new State.
   * @param {string} name
   * @param {string} abbreviation
   * @param {string} region
   * @throws {BusinessError} Throws an object with httpStatus, the error message and the error code.
   * @returns {json} Returns an object with the information cleaned and validated.
   */
  async validateUpdateState(name, abbreviation, region) {
    if (!name) {
      throw new BusinessError(
        "STATE-PARAMETER",
        `O nome do Estado é um campo obrigatório. ${TECHNICAL_SUPPORT_MESSAGE}.`,
        HTTP_BAD_REQUEST
      );
    }
    if (!abbreviation) {
      throw new BusinessError(
        "STATE-PARAMETER",
        `A UF do Estado é um campo obrigatório. ${TECHNICAL_SUPPORT_MESSAGE}.`,
        HTTP_BAD_REQUEST
      );
    }
    if (!region) {
      throw new BusinessError(
        "STATE-PARAMETER",
        `A região do Estado é um campo obrigatório. ${TECHNICAL_SUPPORT_MESSAGE}.`,
        HTTP_BAD_REQUEST
      );
    }
    const updateAt = new Date();
    return { name, abbreviation, region, updateAt };
  }
}

module.exports = new StateValidation();
