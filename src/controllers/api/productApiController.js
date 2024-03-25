const { Product, ColorProduct, Category, User, Color, Review, sequelize, Brand } = require('../../database/models');
const fs = require("fs");
const path = require("path");

const { Op } = require("sequelize");
const { saveImage } = require('../../middlewares/productMulterMemoryMiddleware');
const ResponseHandler = require('../../models/ResponseHandler');
const { validationResult } = require('express-validator');
const productsController = {
  create: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const errors = validationResult(req);
      // console.log(req.body);
      // console.log(errors);
      if (!errors.isEmpty()) {
        if (transaction) await transaction.rollback();
        const responseHandler = new ResponseHandler(404, "Errores en el formulario.", errors.mapped(), req.originalUrl);
        return responseHandler.sendResponse(res);
      }
      const colorStocks = JSON.parse(req.body.colorStocks);

      const price = parseInt(req.body.price);
      const discount = parseInt(req.body.discount);
      const final_price = price - (price * discount) / 100;

      const nombreArchivo = saveImage(req.file);
      const product = await Product.create({
        name: req.body.name,
        description_short: req.body.description_short,
        description_long: req.body.description_long,
        status: 1,
        image: nombreArchivo,
        category_id: req.body.category_id,
        ingredients: req.body.ingredients,
        price,
        discount,
        final_price,
        brand_id: req.body.brand_id
      }, { transaction });
      console.log(JSON.stringify(product, null, 4));
      console.log(product.id);
      const product_id = product.id;
      console.log(req.body);
      console.log(colorStocks);
      for (const colorStock of colorStocks) {
        console.log(colorStock);
        await ColorProduct.create({
          product_id: product_id,
          color_id: colorStock.color_id,
          stock: colorStock.stock
        }, { transaction });
      };

      await transaction.commit();
      const responseHandler = new ResponseHandler(200, "Producto Creado.", product, req.originalUrl);
      responseHandler.sendResponse(res);
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.log(error);
      res.send(error.message);
    }
  },
  count: async (req, res) => {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "name"],
        include: { model: Product, as: 'products', attributes: ['id', 'name'] }
      });
      const products = await Product.findAll({
        attributes: ["id"],
      });
      const users = await User.findAll({
        attributes: ["id"],
      });
      res.json({
        countCat: categories.length,
        categories: categories,
        countProd: products.length,
        countUser: users.length
      });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  },
  getLast: async (req, res) => {
    try {
      const products = await Product.findAll({
        order: [['id', 'DESC']],
        limit: 1
      });

      res.json(products);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  },
  getAll: async (req, res) => {
    const transaction = await sequelize.transaction();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name || "";
    const offset = (page - 1) * limit;

    try {
      const { count, rows } = await Product.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        attributes: ["id", "name", "description_short", "image"],
        include: [{
          model: Color,
          as: "colors",
          attributes: ["id", "name"],
          through: { attributes: [] }
        }],
        limit,
        offset,
        distinct: true
      });

      console.log(count);

      const productsWithDetail = rows.map((product) => {
        return {
          ...product.toJSON(),
          detail: `http://localhost:3010/api/products/${product.id}`
        };
      });

      const results = await Product.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('Product.id')), 'totalProducts']
        ],
        group: "category_id",
        include: [{
          model: Category,
          as: "category",
          attributes: ["name"]
        }]
      });

      const countByCategory = {};
      results.forEach(result => {
        const name = result.category.name;
        const totalProducts = result.getDataValue('totalProducts');
        countByCategory[name] = totalProducts;
      });

      const products = {
        count,
        countByCategory,
        products: productsWithDetail
      };

      await transaction.commit();
      const responseHandler = new ResponseHandler(200, "Listado de productos.", products, req.originalUrl);
      responseHandler.sendResponse(res);
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.log(error);
      const responseHandler = new ResponseHandler(500, "Error al obtener los productos.", [], req.originalUrl);
      responseHandler.sendResponse(res);
    };
  },
  getProduct: async (req, res) => {
    const transaction = await sequelize.transaction();
    const { productId } = req.params;
    let responseHandler;
    try {
      const result = await Product.findByPk(productId, {
        attributes: { exclude: ["status", "created_at", "updated_at"] },
        include: [{
          model: Review,
          attributes: ["id", "user_id", "comment", "rating"]
        },
        {
          model: ColorProduct,
          as: "stocks",
          attributes: { exclude: ["id", "product_id"] }
        },
        {
          model: Color,
          as: "colors",
          attributes: ["id", "name"],
          through: { attributes: [] }
        },
        {
          model: Brand,
          as: "brand",
          attributes: ["id", "name"],
        },
        {
          model: Category,
          as: 'category',
          attributes: ["id", "name"],
        }
      ]
      });

      const product = {
        ...result.toJSON(),
        image: `http://localhost:3010/img/products/${result.image}`
      };
      console.log(product);
      if (product) {
        responseHandler = new ResponseHandler(200, "Product.", product, req.originalUrl);
      }
      else {
        responseHandler = new ResponseHandler(204, "Product.", [], req.originalUrl);
      }
      await transaction.commit();
      product.stocks.forEach(stock => {
        console.log("Color_id:", stock.color_id);
        console.log("stock:", stock.stock);
      });
      responseHandler.sendResponse(res);
    } catch (error) {
      console.log(error);
      if (transaction) await transaction.rollback();
      responseHandler = new ResponseHandler(204, "Error al obtener el producto.", [], req.originalUrl);
      responseHandler.sendResponse(res);
    }
  },
  update: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const id = req.params.id;
      console.log("id:", id);
      console.log("entre:", req.body);

      const product = await Product.findByPk(id, {
        include: [
          {
            model: ColorProduct,
            as: "stocks",
          },
          {
            model: Color,
            as: 'colors',
            through: {
              attributes: ['stock', 'id']
            },

          }
        ]
      }, { transaction });
      const { name, description_short, description_long, category, ingredients, price, discount, brand } = req.body;
      const finalPrice = price - (price * discount) / 100;
      let img = product.image
      if (req.file != undefined) {
        fs.unlinkSync(
          path.join(__dirname, "../../../public/img/products", img)
        );
        img = saveImage(req.file);
      }

      // const nombreArchivo = saveImage(req.file);
      await Product.update({
        name: name,
        description_short: description_short,
        description_long: description_long,
        category_id: category,
        ingredients: ingredients,
        image: img,
        price: price,
        discount: discount,
        final_price: finalPrice,
        brand_id: brand,
      }, {
        where: {
          id: req.params.id
        }
      }, { transaction })
      const colorStocks = JSON.parse(req.body.colorStocks);

      for (const colorProduct of product.stocks) {
        const colorProductToDelete = colorStocks.find(c => c.color_id === colorProduct.color_id);
        console.log("colorProductToDelete", colorProductToDelete);
        console.log("colorProduct", colorProduct);
        if (colorProductToDelete === undefined) {
          console.log("Por borrar:", colorProductToDelete);
          await ColorProduct.destroy({ where: { id: colorProduct.id } }, { transaction });
        } else {
          colorProduct.stock = colorProductToDelete.stock;
          await colorProduct.save({ transaction });
        }
      }

      for (const colorStock of colorStocks) {
        const productColor = await ColorProduct.findOne({
          where: {
            product_id: id,
            color_id: colorStock.color_id
          }
        }, { transaction });

        if (productColor == null) {
          await ColorProduct.create({
            product_id: id,
            color_id: colorStock.color_id,
            stock: colorStock.stock
          }, { transaction });
        }
      };


      await transaction.commit();
      const responseHandler = new ResponseHandler(200, "Producto Actualizado.", [], req.originalUrl);
      responseHandler.sendResponse(res);
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.log(error);
      res.send(error.message);
    }

  },
  getCategories: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;
      const { id } = req.params
      const categoryName = await Category.findByPk(id, {
        attributes: ["name"],
      })
      const { count, rows } = await Product.findAndCountAll({
        where: {
          category_id: id,
        },
        limit,
        offset,
        distinct: true
      });
      const productsArray = rows.map((product) => {
        return {
          ...product.toJSON()
        };
      });
      const products = {
        count,
        products: productsArray
      };
      const responseHandler = new ResponseHandler(200, categoryName.name, products);
      responseHandler.sendResponse(res);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  },
  delete: async (req, res) => {
    try {
      let img
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (product === undefined) {
        res.json({ product: 'Not Found' })
      }

      else {
        img = product.image
        console.log(img);
        await Product.destroy({
          where: {
            id: id
          },
        })
      }
      fs.unlinkSync(path.join(__dirname, "../../../public/img/products", img));
      res.json({ product: 'Deleted' });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
};

module.exports = productsController;