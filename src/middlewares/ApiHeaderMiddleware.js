const LOGGER = require("../logger").createLogger("API_HEADER_MIDDLEWARE");
const ApiException = require("../exceptions/ApiException");

class ApiHeaderMiddleware {
  /**
   * @description Verify if the requester has the x api description necessary to access the api.
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  interceptHeaderXAPIID(req, res, next) {
    LOGGER.info("Entering in method interceptHeaderXAPIID");
    const xApiDst = req.headers["x-api-dst"];
    if (xApiDst && xApiDst === "ZOOX-CHALLENGE") {
      LOGGER.info("Go to the next middleware or controller method");
      req.applicationID = xApiDst;
      next();
    } else {
      LOGGER.error("Error while get request headers");
      throw new ApiException(401, "Erro ao ler parâmetros de requisição", {
        code: "MDW-MISSING-PARAMETERS",
        message: "Parâmetros de requisição obrigatórios não fornecidos",
      });
    }
  }
}

module.exports = new ApiHeaderMiddleware();
