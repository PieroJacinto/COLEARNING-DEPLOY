"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("colors", {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
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

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('colors');
    
  },
};
