'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('productcarts', [{
       id:1,
       product_id:1,
       quantity:2,
       cart_id:1

     },{
      id:2,
       product_id:2,
       quantity:1,
       cart_id:1

     }], {});
  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('productcarts', null, {});
    
  }
};
