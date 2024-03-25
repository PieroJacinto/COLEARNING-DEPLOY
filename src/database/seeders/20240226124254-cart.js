'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('carts', [{
       id:1,
       user_id:1,
       total:50,
       items:3
     }], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('carts', null, {});
    
  }
};
