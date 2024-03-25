'use strict';

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('products', { 
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description_short:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description_long:{
        type: DataTypes.TEXT('medium'),
        allowNull: false
    },
    status:{
        type: DataTypes.INTEGER(2),
        allowNull: false,
    },
    image:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    category_id:{
        type: DataTypes.INTEGER(10),
        allowNull:false,
    },
    ingredients:{
        type: DataTypes.STRING(500),
        allowNull: true
    },
    price:{
        type: DataTypes.FLOAT(10),
        allowNull: false
    },
    final_price:{
        type: DataTypes.FLOAT(10),
        allowNull: false
    },
    discount:{
        type: DataTypes.INTEGER(10),
        allowNull: true
    },
    brand_id:{
        type: DataTypes.INTEGER(10),
        allowNull:true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull:true
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull:true
      },
     });
     
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('products');
    
  }
};
