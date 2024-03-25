module.exports = (sequelize, dataTypes) => {
  let alias = "Cart";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
    total: {
      type: dataTypes.FLOAT(10),
      allowNull: false,
    },
    items: {
      type: dataTypes.INTEGER(10),
      allowNull: true,
    },
    created_at: {
      allowNull: true,
      type: dataTypes.DATE,
    },
    updated_at: {
      allowNull: true,
      type: dataTypes.DATE,
    },
  };
  let config = {
    tableName: "carts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };

  const Cart = sequelize.define(alias, cols, config);

  Cart.associate = function (models) {
    Cart.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    }),
      Cart.hasMany(models.ProductCart, {
        as:'productscarts',
        foreignKey: "cart_id",
        onDelete: "CASCADE",
      });
    Cart.belongsToMany(models.Product, {
      as: "products",
      through: "productcarts",
      foreignKey: "cart_id",
      otherKey: "product_id",
      timestamps: false,
    });
  };
  return Cart;
};
