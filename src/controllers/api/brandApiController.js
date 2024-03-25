const { Brand } = require("../../database/models");
const ResponseHandler = require('../../models/ResponseHandler');
const brandApiController = {
  getAll: async (req, res) => {
    try {
      const brands = await Brand.findAll({ attributes: ["id", "name"] }) || [];
      const responseHandler = new ResponseHandler(200, "Listado de marcas.", brands, req.originalUrl);
      responseHandler.sendResponse(res);
    } catch (error) {
      console.error(error);
      const responseHandler = new ResponseHandler(500, "Error al obtener las marcas.", [], req.originalUrl);
      responseHandler.sendResponse(res);
    }
  }
}

module.exports = brandApiController;