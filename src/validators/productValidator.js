const { body } = require('express-validator');
const { Category, Brand, Color } = require('../database/models');

exports.validateCreateProduct = [
  body('name')
    .trim()
    .notEmpty().withMessage('Debe ingresar el nombre del producto.').bail()
    .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 letras"),
  body('description_short')
    .trim()
    .notEmpty().withMessage('Debe ingresar la descripcion corta.').bail()
    .isLength({ min: 20 }).withMessage("La descripcion corta debe tener 20 letras como minimo."),
  body('description_long')
    .trim()
    .notEmpty().withMessage('Debe ingresar la descripcion larga.').bail()
    .isLength({ min: 20 }).withMessage("La descripcion larga debe tener 20 letras como minimo."),
  // body('category_id')
  //   .notEmpty().withMessage('Debe seleccionar una categoria para el producto.').bail()
  //   .custom(async (value) => {
  //     const categoryExist = await Category.findByPk(value);
  //     if (categoryExist)
  //       throw new Error('La categoria seleccionada no existe');
  //     return true;
  //   }),
  body('brand_id')
    .notEmpty().withMessage('Debe seleccionar una marca para el producto.').bail()
    .custom(async (value) => {
      console.log(value);
      const brandExist = await Brand.findByPk(value);
      console.log(brandExist);
      if (!brandExist)
        throw new Error('La marca seleccionada no existe');
      return true;
    }),
  body('ingredients')
    .trim()
    .notEmpty().withMessage('Debe ingresar los ingredientes del producto.').bail(),
  body('price')
    .notEmpty().withMessage('Debe ingresar el precio del producto.').bail(),
  body('discount')
    .notEmpty().withMessage("Debe ingresar el descuento del producto.").bail(),
  // body('colorStocks')
  //   .notEmpty().withMessage("Debe ingresar un color para el producto").bail()
  //   .custom((async (value) => {
  //     const colorStocks = JSON.parse(value);
  //     for (const colorStock of colorStocks) {
  //       if (colorStock.stock < 1)
  //         throw new Error('El stock debe ser mayor a 0');
  //       const colorExist = await Color.findByPk(colorStock.color_id);
  //       if (colorExist)
  //         throw new Error('El color no existe.');
  //       return true;
  //     }
  //   })),
  body('product')
    .custom((value, { req }) => {
      if (req.file === undefined)
        throw new Error('Tiene que cargar una imagen del product.');

      if (
        req.file.mimetype === 'image/jpeg' ||
        req.file.mimetype === 'image/png' ||
        req.file.mimetype === 'image/jpg'
      ) {
        return true;
      }
      else {

        throw new Error('El archivo debe ser una imagen JPEG, PNG o JPG.');
      }
    })

];

// exports.validateUpdateProduct = [

// ];