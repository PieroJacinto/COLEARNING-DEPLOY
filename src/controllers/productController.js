const db = require("../database/models");
const Product = db.Product;
const Category = db.Category;
const Color = db.Color;
const Brand = db.Brand;
const Review = db.Review;
const User = db.User;
const Cart = db.Cart;
const ProductCart = db.ProductCart;
const ColorProduct = db.ColorProduct
const { Op } = require("sequelize");

const ResponseHandler = require('../models/ResponseHandler');

const fs = require("fs");

const path = require("path");
const { validationResult } = require("express-validator");
// const Review = require("../database/models/Review");

const toThousand = (numero) => {
  const opciones = {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const formatoNumero = new Intl.NumberFormat("de-DE", opciones);
  return formatoNumero.format(numero);
};

const productController = {
  index: async (req, res) => {
    try {
      const featured = await Product.findAll({
        where: {
          discount: 0
        },
      });
      const offers = await Product.findAll({
        where: {
          discount: { [Op.ne]: 0 },
        },
      });
      res.render("./products/products", { offers, featured, toThousand });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  },
  // esto se cambia si hacemos el cart nomas
  cart:async (req, res) => {
    const cart = await Cart.findByPk(1, {
      include:[{ association: 'products' }, { model: ProductCart, as: 'productscarts' }]
    })
    res.render("./products/cart", {cart, toThousand});
  },
  detail: async (req, res) => {
    try {
      const user_id = req.session.userLogged && req.session.userLogged.id;
      const { id } = req.params;
      const products = await Product.findAll();
      const product = await Product.findByPk(id, {
        include: {
          model: Review, attributes: ['comment', 'rating', 'created_at'],
          include: {
            model: User, attributes: ['first_name', 'last_name']
          }
        }
      });
      if (product === undefined) res.redirect("../not-found");
      const reviews = await product.getReviews();
      let userHasCommented = reviews.some((review) => review.user_id === user_id && review.product_id === product.id);
      console.log(userHasCommented);
      const productJson = product.get({ plain: true });
      // console.log(productJson.Reviews[0].User);
      res.render("./products/productDetail", { product: productJson, products, toThousand, userHasCommented });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  },
  createProduct: async (_, res) => {
    try {
      const categories = await Category.findAll()
      const colors = await Color.findAll()
      const brands = await Brand.findAll()
      res.render("./products/createProduct", { categories, colors, brands });
    } catch (error) {
      console.error(error);
      res.send(error.message);
    }
  },
  create2: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.render("./products/create", {
          errors: errors.mapped(),
          old: req.body,
        });
      };
      console.log(req.body);
      // const precio = parseInt(req.body.price);
      // const descuento = parseInt(req.body.discount);
      // const finalPrice = precio - (precio * descuento) / 100;
      // const product = await Product.create({
      //   name: req.body.name,
      //   description_short: req.body.description_short,
      //   description_long: req.body.description_long,
      //   status: 1,
      //   image: req.file.filename,
      //   category_id: req.body.category,
      //   ingredients: req.body.ingredients,
      //   price: precio,
      //   discount: descuento,
      //   final_price: finalPrice,
      //   brand_id: req.body.brand,
      // });
      // console.log(product);
      // const posicionStock = req.body.color
      // const stock = req.body.stock[posicionStock - 1]
      // await product.createStock({
      //   color_id: req.body.color,
      //   stock: stock
      // })
      // res.redirect("/");
      res.send(req.body);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  },
  productToEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const categories = await Category.findAll()
      const colors = await Color.findAll()
      const brands = await Brand.findAll()
      const product = await Product.findByPk(id, {
        include: [{ association: 'colors' }, { model: ColorProduct, as: 'stocks' }]
      });
      console.log('probando product', JSON.stringify(product, null, 4));
      console.log(product.constructor.prototype);

      if (product === undefined) res.redirect("../not-found");
      res.render("./products/editProduct", { product, categories, colors, brands });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  },
  update2: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findByPk(id, {
        include: [
          {
            model: Color,
            as: 'colors',
            through: {
              attributes: ['stock', 'id']
            }
          }
        ]
      });
      console.log('probando product', JSON.stringify(product, null, 4));
      const { name, description_short, description_long, category, ingredients, price, discount, brand, color } = req.body;
      const finalPrice = price - (price * discount) / 100;
      let img = product.image
      if (req.file != undefined) {
        fs.unlinkSync(
          path.join(__dirname, "../../public/img/products", img)
        );
        img = req.file.filename
      }

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
      })
      // const stockId = 'stock'+ color
      // console.log(stockId);
      // console.log(req.body);
      const stock = req.body.stock[color - 1]
      console.log(stock);
      const productColor = await ColorProduct.findOne({
        where: {
          product_id: id,
          color_id: color
        }
      })

      if (productColor) {
        productColor.stock = stock
        await productColor.save()
      } else {
        await product.createStock({
          color_id: color,
          stock: stock
        })
      }
      res.redirect(`/products/${id}`);
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
  },
  delete: async (req, res) => {
    try {
      let img
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (product === undefined) {
        res.redirect("../not-found")
      }

      else {
        img = product.image
        await Product.destroy({
          where: {
            id: id
          },
        })
      }
      fs.unlinkSync(path.join(__dirname, "../../public/img/products", img));
      res.redirect("/products");    
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  },
  search: async (req, res) => {
    try {
      const search = req.body.search
      const products = await Product.findAll({
        where: {
          name: { [Op.like]: `%${search}%` }
        }
      })
      res.render('./products/productSearch', { products, toThousand })

    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  },
  comment: async (req, res) => {
    try {
      const user_id = req.session.userLogged.id;
      console.log(req.session.userLogged);
      const product_id = parseInt(req.params.id);
      const { commentText: comment, rating } = req.body;
      const product = await Product.findByPk(product_id);
      if (product == null) {
        const responseHandler = new ResponseHandler(404, "Producto inexistente", null, req.originalUrl);
        responseHandler.sendResponse(res);
      }
      const commentCreated = await product.createReview({ user_id, comment, rating });
      const commentJson = commentCreated.get({ plain: true });
      const userReview = await User.findByPk(commentJson.user_id, {attributes:['first_name', 'last_name']})
      const response = {...commentJson,firstName: userReview.first_name, lastName: userReview.last_name};
      console.log(response);
      delete response.product_id;
      delete response.user_id;
      delete response.updated_at;
      const responseHandler = new ResponseHandler(200, "Comentario Creado", response, req.originalUrl);
      responseHandler.sendResponse(res);

    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },
};

module.exports = productController;