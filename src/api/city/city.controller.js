const LOGGER = require("../../logger").createLogger("CITY_CONTROLLER");
const ApiException = require("../../exceptions/ApiException");
const ApiResultData = require("../../models/ApiResultData");
const CityService = require("./city.service");
const { HTTP_OK, HTTP_BAD_REQUEST } = require("../utils/Constants");

class CityController {
  async getCities(req, res, next) {
    LOGGER.info("Entering in method getCities.");
    try {
      const response = await CityService.getCities(req.query);
      LOGGER.info(
        `Successfully answered the CountryController request. Response: ${JSON.stringify(
          response
        )}.`
      );
      return res
        .status(HTTP_OK)
        .json(
          new ApiResultData(
            HTTP_OK,
            "Consulta da lista de cidades realizada com sucesso.",
            response
          )
        );
    } catch (error) {
      LOGGER.error(JSON.stringify(error));
      next(
        new ApiException(
          error.httpStatus || HTTP_BAD_REQUEST,
          "Não foi possível buscar a lista de cidades. Por favor, tente novamente. Detalhes do erro: " +
            error.message,
          { code: error.code, message: error.message }
        )
      );
    }
  }

  async getCityById(req, res, next) {
    LOGGER.info("Entering in method getCityById.");
    try {
      const response = await CityService.getCityById(req.params);
      LOGGER.info(
        `Successfully answered the getCityById request. Response: ${JSON.stringify(
          response
        )}.`
      );
      return res
        .status(HTTP_OK)
        .json(
          new ApiResultData(
            HTTP_OK,
            "Consulta do cidade realizada com sucesso.",
            response
          )
        );
    } catch (error) {
      LOGGER.error(JSON.stringify(error));
      next(
        new ApiException(
          error.httpStatus || HTTP_BAD_REQUEST,
          "Não foi possível buscar a cidade. Por favor, tente novamente. Detalhes do erro: " +
            error.message,
          { code: error.code, message: error.message }
        )
      );
    }
  }

  async insertCity(req, res, next) {
    LOGGER.info("Entering in method insertCity.");
    try {
      const response = await CityService.insertCity(req.body);
      LOGGER.info(
        `Successfully answered the insertCity request. Response: ${JSON.stringify(
          response
        )}.`
      );
      return res
        .status(HTTP_OK)
        .json(
          new ApiResultData(HTTP_OK, "Cidade salva com sucesso.", response)
        );
    } catch (error) {
      LOGGER.error(JSON.stringify(error));
      next(
        new ApiException(
          error.httpStatus || HTTP_BAD_REQUEST,
          "Não foi possível salvar esta Cidade. Por favor, tente novamente. Detalhes do erro: " +
            error.message,
          { code: error.code, message: error.message }
        )
      );
    }
  }

  async updateCity(req, res, next) {
    LOGGER.info("Entering in method updateCity.");
    try {
      const response = await CityService.updateCity(req.params, req.body);
      LOGGER.info(
        `Successfully answered the updateCity request. Response: ${JSON.stringify(
          response
        )}.`
      );
      return res
        .status(HTTP_OK)
        .json(
          new ApiResultData(HTTP_OK, "Cidade atualizada com sucesso.", response)
        );
    } catch (error) {
      LOGGER.error(JSON.stringify(error));
      next(
        new ApiException(
          error.httpStatus || HTTP_BAD_REQUEST,
          "Não foi possível atualizar esta cidade. Por favor, tente novamente. Detalhes do erro: " +
            error.message,
          { code: error.code, message: error.message }
        )
      );
    }
  }

  async deleteCity(req, res, next) {
    LOGGER.info("Entering in method deleteCity.");
    try {
      const response = await CityService.deleteCity(req.params);
      LOGGER.info(
        `Successfully answered the deleteCity request. Response: ${JSON.stringify(
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

module.exports = new CityController();
