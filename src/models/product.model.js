const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const model = {
  file: join(__dirname, "../data", "products.json"),
  index: () => {
    try {
      return JSON.parse(readFileSync(model.file));
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  findOne: (id) => model.index().find((product) => product.id == id),
  generateId: () => {
    const products = model.index();
    if (products.length > 0) {
      id = Math.max(...products.map((x) => x.id)) + 1;
    } else {
      id = 1;
    }
    return id;
  },
  create: (file) => writeFileSync(model.file, JSON.stringify(file, null, 2)),
  update: (product) => {
    const products = model.index();
    const indexProduct = products.findIndex(
      (oneProduct) => oneProduct.id === product.id
    );
    if (indexProduct != -1) {
      products[indexProduct] = product;
    } else {
      products.push(product);
    }
    model.create(products);
  },
};



module.exports = model;
