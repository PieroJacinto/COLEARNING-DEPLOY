"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reviews", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'products',
            // schema: 'schema'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
            // schema: 'schema'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      comment: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('reviews', ['product_id', 'user_id'], {
      unique: true,
      name: 'review_index'
    })
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('reviews');

  },
};
