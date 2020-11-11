const LOGGER = require("../../logger").createLogger("STATE_CONTROLLER");
const ApiException = require("../../exceptions/ApiException");
const ApiResultData = require("../../models/ApiResultData");
const StateService = require("./state.service");
const {
  HTTP_OK,
  HTTP_BAD_REQUEST,
  HIDDEN_EXCESSIVE_INFORMATION,
} = require("../utils/Constants");

class StateController {
  async getStates(req, res, next) {
    LOGGER.info("Entering in method getStates.");
    try {
      const response = await StateService.getStates(req.query);
      LOGGER.info(
        `Successfully answered the CountryController request. Response: ${HIDDEN_EXCESSIVE_INFORMATION}.`
      );
      return res
        .status(HTTP_OK)
        .json(
          new ApiResultData(
            HTTP_OK,
            "Consulta da lista de estados realizada com sucesso.",
            response
          )
        );
    } catch (error) {
      LOGGER.error(JSON.stringify(error));
      next(
        new ApiException(
          error.httpStatus || HTTP_BAD_REQUEST,
          "Não foi possível buscar a lista de estados. Por favor, tente novamente. Detalhes do erro: " +
            error.message,
          { code: error.code, message: error.message }
        )
      );
    }
  }

  async getStateById(req, res, next) {
    LOGGER.info("Entering in method getStateById.");
    try {
      const response = await StateService.getStateById(req.params);
      LOGGER.info(
        `Successfully answered the getStateById request. Response: ${JSON.stringify(
          response
        )}.`
      );
      return res
        .status(HTTP_OK)
        .json(
          new ApiResultData(
            HTTP_OK,
            "Consulta do estado realizada com sucesso.",
            response
          )
        );
    } catch (error) {
      LOGGER.error(JSON.stringify(error));
      next(
        new ApiException(
          error.httpStatus || HTTP_BAD_REQUEST,
          "Não foi possível buscar o estado. Por favor, tente novamente. Detalhes do erro: " +
            error.message,
          { code: error.code, message: error.message }
        )
      );
    }
  }

  async insertState(req, res, next) {
    LOGGER.info("Entering in method insertState.");
    try {
      const response = await StateService.insertState(req.body);
      LOGGER.info(
        `Successfully answered the insertState request. Response: ${JSON.stringify(
          response
        )}.`
      );
      return res
        .status(HTTP_OK)
        .json(
          new ApiResultData(HTTP_OK, "Estado salvo com sucesso.", response)
        );
    } catch (error) {
      LOGGER.error(JSON.stringify(error));
      next(
        new ApiException(
          error.httpStatus || HTTP_BAD_REQUEST,
          "Não foi possível salvar este estado. Por favor, tente novamente. Detalhes do erro: " +
            error.message,
          { code: error.code, message: error.message }
        )
      );
    }
  }

  async updateState(req, res, next) {
    LOGGER.info("Entering in method updateState.");
    try {
      const response = await StateService.updateState(req.params, req.body);
      LOGGER.info(
        `Successfully answered the updateState request. Response: ${JSON.stringify(
          response
        )}.`
      );
      return res
        .status(HTTP_OK)
        .json(
          new ApiResultData(HTTP_OK, "Estado atualizado com sucesso.", response)
        );
    } catch (error) {
      LOGGER.error(JSON.stringify(error));
      next(
        new ApiException(
          error.httpStatus || HTTP_BAD_REQUEST,
          "Não foi possível atualizar este estado. Por favor, tente novamente. Detalhes do erro: " +
            error.message,
          { code: error.code, message: error.message }
        )
      );
    }
  }

  async deleteState(req, res, next) {
    LOGGER.info("Entering in method deleteState.");
    try {
      const response = await StateService.deleteState(req.params);
      LOGGER.info(
        `Successfully answered the deleteState request. Response: ${JSON.stringify(
          response
        )}.`
      );
      return res
        .status(HTTP_OK)
        .json(
          new ApiResultData(HTTP_OK, "Estado deletado com sucesso.", response)
        );
    } catch (error) {
      LOGGER.error(JSON.stringify(error));
      next(
        new ApiException(
          error.httpStatus || HTTP_BAD_REQUEST,
          "Não foi possível deletar este estado. Por favor, tente novamente. Detalhes do erro: " +
            error.message,
          { code: error.code, message: error.message }
        )
      );
    }
  }
}

module.exports = new StateController();
