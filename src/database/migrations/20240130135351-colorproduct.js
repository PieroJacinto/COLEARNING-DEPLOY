'use strict';

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('color_products', { 
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    color_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        references: {
          model: {
            tableName: 'colors',
            //schema: 'schema'
          },
          key: 'id'
        },
          onDelete: 'CASCADE'
    },
    product_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        references: {
          model: {
            tableName: 'products',
            //schema: 'schema'
          },
          key: 'id'
        },
        onDelete: 'CASCADE'
    },  
    stock: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    }
     });
     await queryInterface.addIndex('color_products',['color_id','product_id'],{
      unique:true,
      name:'product_color_index'
     })
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('color_products');

  }
};
