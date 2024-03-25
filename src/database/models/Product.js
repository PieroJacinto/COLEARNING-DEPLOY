module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    description_short: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    description_long: {
      type: dataTypes.TEXT("medium"),
      allowNull: false,
    },
    status: {
      type: dataTypes.INTEGER(2),
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    category_id: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
    ingredients: {
      type: dataTypes.STRING(500),
      allowNull: true,
    },
    price: {
      type: dataTypes.FLOAT(10),
      allowNull: false,
    },
    final_price: {
      type: dataTypes.FLOAT(10),
      allowNull: false,
    },
    discount: {
      type: dataTypes.INTEGER(10),
      allowNull: true,
    },
    brand_id: {
      type: dataTypes.INTEGER(10),
      allowNull: true,
    },
    // created_at: dataTypes.TIMESTAMP,
    // updated_at: dataTypes.TIMESTAMP,
  };
  let config = {
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      as: "category",
      foreignKey: "category_id",
    });
    Product.belongsTo(models.Brand, {
      as: "brand",
      foreignKey: "brand_id",
    });
    Product.belongsToMany(models.Color, {
      as: "colors",
      through: "color_products",
      foreignKey: "product_id",
      otherKey: "color_id",
      timestamps: false,
    }),
      Product.hasMany(models.ColorProduct, {
        as: "stocks",
        foreignKey: "product_id",
        onDelete: "CASCADE",
      }),
      Product.hasMany(models.Review, {
        //   as: "reviews",
        foreignKey: "product_id",
        onDelete: "CASCADE",
      }),
      Product.hasMany(models.ProductCart, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
      }),
      Product.belongsToMany(models.Cart, {
        as: "carts",
        through: "productcarts",
        foreignKey: "product_id",
        otherKey: "cart_id",
        timestamps: false,
      });
  };

  return Product;
};
