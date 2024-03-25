'use strict';
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('color_categories', { 
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
        onDelete:'CASCADE'
    },
    category_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        references: {
          model: {
            tableName: 'categories',
            //schema: 'schema'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
    }
     });
  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('color_categories');
     
  }
};
