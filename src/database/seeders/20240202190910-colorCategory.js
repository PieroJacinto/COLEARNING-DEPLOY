'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('color_categories', [{
        id:1,
        color_id:1,
        category_id:4
      },{
        id:2,
        color_id:2,
        category_id:3
      },{
        id:3,
        color_id:3,
        category_id:2
      },{
        id:4,
        color_id:4,
        category_id:1
      },{
        id:5,
        color_id:5,
        category_id:1
      },{
        id:6,
        color_id:6,
        category_id:2
      },{
        id:7,
        color_id:7,
        category_id:3
      },{
        id:8,
        color_id:8,
        category_id:4
      },{
        id:9,
        color_id:9,
        category_id:1
      },{
        id:10,
        color_id:10,
        category_id:2
      },{
        id:11,
        color_id:11,
        category_id:3
      },], {});
    
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('color_categories', null, {});
     
  }
};
