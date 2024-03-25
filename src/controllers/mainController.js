const {index, findOne} = require("../models/product.model");
const db = require("../database/models");
const Product = db.Product;
const { Op } = require("sequelize");
const toThousand = (numero) =>{
    const opciones = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };
    const formatoNumero = new Intl.NumberFormat('de-DE', opciones);
    return formatoNumero.format(numero);
}


const mainController = {
  home: async (req, res) => {
    try {
      const featured = await Product.findAll({
        where: {
          discount: 0,
        },
      });
      const offers = await Product.findAll({
        where: {
          discount: { [Op.ne]: 0 },
        },
      });
      //res.json(offers);
    res.render("home", { offers, featured, toThousand });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  },
};

module.exports = mainController;
