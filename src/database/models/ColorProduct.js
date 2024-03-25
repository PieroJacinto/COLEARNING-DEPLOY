module.exports = (sequelize, dataTypes) => {
  let alias = "ColorProduct";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    color_id: {
      type: dataTypes.INTEGER(10),
    },
    product_id: {
      type: dataTypes.INTEGER(10),
    },
    stock: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
  };
  let config = {
    tableName: "color_products",
    timestamps: false,
    deletedAt: false,
    indexes: [
      {
        unique: true,
        fields: ["color_id", "product_id"],
      }
    ],
  };

  const ColorProduct = sequelize.define(alias, cols, config);

  ColorProduct.associate = (models) => {
    ColorProduct.belongsTo(models.Color, { foreignKey: "color_id" });
    ColorProduct.belongsTo(models.Product, { foreignKey: "product_id" });
  };

  return ColorProduct;
};
