module.exports = (sequelize, dataTypes) => {
  let alias = "ProductCart";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
    quantity:{
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
    cart_id: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
  };
  let config = {
    tableName: "productcarts",
    timestamps: false,
    deletedAt: false,
  };

  const ProductCart = sequelize.define(alias, cols, config);

  ProductCart.associate = function (models) {
    ProductCart.belongsTo(models.Product, {
      foreignKey: "product_id",
    }),
      ProductCart.belongsTo(models.Cart, {
        foreignKey: "cart_id",
      });
  };
  return ProductCart;
};
