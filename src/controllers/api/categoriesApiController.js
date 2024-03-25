const { Category, sequelize, Color } = require('../../database/models');
const ResponseHandler = require('../../models/ResponseHandler');

const categoriesApiController = {
  getOne: async (req, res) => {
    try {

      const { idCat } = req.params
      console.log(idCat);
      const category = await Category.findByPk(idCat, {
        include: [{ association: 'products' }],
      });
      res.json(category)
    } catch (error) {
      console.log(error);
    }
  },
  getColors: async (req, res) => {
    const categoryId = req.params.id;
    console.log(categoryId);
    const category = await Category.findByPk(categoryId, {
      include: {
        model: Color, as: "colors", attributes: ['id', 'name',], through: { attributes: [] }
      }
    });
    console.log(JSON.stringify(category, null, 4));
    const colorCategories = await category.getColorCategories();
    // console.log(category.constructor.prototype);
    console.log(JSON.stringify(colorCategories, null, 4));
    const responseHandler = new ResponseHandler(200, 'Listado de colores', category.colors, req.originalUrl);
    responseHandler.sendResponse(res);
  },
  getAll: async (req, res) => {
    try {
      const categories = await Category.findAll({ attributes: ["id", "name"] });
      const responseHandler = new ResponseHandler(200, "Listado de categorias.", categories, req.originalUrl);
      responseHandler.sendResponse(res);
    } catch (error) {
      console.error(error);
      const responseHandler = new ResponseHandler(500, "Error al obtener las categorias.", [], req.originalUrl);
      responseHandler.sendResponse(res);
    }
  }
}


module.exports = categoriesApiController;