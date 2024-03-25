'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('color_products', [{
       id: 1,
       color_id:4,
       product_id:1,
       stock:10
     },{
      id: 2,
      color_id:9,
      product_id:2,
      stock:5    
    },{
      id: 3,
      color_id:5,
      product_id:3,
      stock:6    
    },
    {
      id: 4,
      color_id:2,
      product_id:4,
      stock:11    
    },
    {
      id: 5,
      color_id:7,
      product_id:4,
      stock:23    
    },
    {
      id: 6,
      color_id:4,
      product_id:2,
      stock:9    
    },{
      id: 7,
      color_id:5,
      product_id:1,
      stock:12    
    },{
      id: 8,
      color_id:9,
      product_id:1,
      stock:1    
    },{
      id: 9,
      color_id:1,
      product_id:5,
      stock:1    
    },{
      id: 10,
      color_id:2,
      product_id:6,
      stock:15    
    },{
      id: 11,
      color_id:1,
      product_id:7,
      stock:8    
    },{
      id: 12,
      color_id:2,
      product_id:8,
      stock:7   
    },{
      id: 13,
      color_id:2,
      product_id:9,
      stock:11    
    },{
      id: 14,
      color_id:10,
      product_id:10,
      stock:16    
    },{
      id: 15,
      color_id:2,
      product_id:11,
      stock:3    
    },{
      id: 16,
      color_id:4,
      product_id:12,
      stock:8    
    },{
      id: 17,
      color_id:8,
      product_id:13,
      stock:11    
    },{
      id: 18,
      color_id:7,
      product_id:14,
      stock:1    
    },{
      id: 19,
      color_id:5,
      product_id:15,
      stock:9    
    },{
      id: 20,
      color_id:2,
      product_id:16,
      stock:33    
    },{
      id: 21,
      color_id:8,
      product_id:17,
      stock:14    
    },{
      id: 22,
      color_id:9,
      product_id:18,
      stock:14    
    },{
      id: 23,
      color_id:7,
      product_id:19,
      stock:99    
    },{
      id: 24,
      color_id:9,
      product_id:20,
      stock:66    
    },{
      id: 25,
      color_id:11,
      product_id:21,
      stock:5    
    },{
      id: 26,
      color_id:7,
      product_id:22,
      stock:29    
    },{
      id: 27,
      color_id:2,
      product_id:23,
      stock:9    
    },{
      id: 28,
      color_id:8,
      product_id:24,
      stock:3    
    },{
      id: 29,
      color_id:1,
      product_id:25,
      stock:11    
    },{
      id: 30,
      color_id:8,
      product_id:26,
      stock:22    
    },{
      id: 31,
      color_id:9,
      product_id:27,
      stock:19    
    },{
      id: 32,
      color_id:11,
      product_id:28,
      stock:18    
    },{
      id: 33,
      color_id:5,
      product_id:29,
      stock:14    
    },{
      id: 34,
      color_id:10,
      product_id:30,
      stock:5    
    },{
      id: 35,
      color_id:5,
      product_id:31,
      stock:2    
    },{
      id: 36,
      color_id:6,
      product_id:32,
      stock:20    
    },{
      id: 37,
      color_id:1,
      product_id:33,
      stock:50    
    },{
      id: 38,
      color_id:3,
      product_id:34,
      stock:40    
    },{
      id: 39,
      color_id:10,
      product_id:35,
      stock:33    
    },{
      id: 40,
      color_id:4,
      product_id:36,
      stock:14    
    },{
      id: 41,
      color_id:3,
      product_id:37,
      stock:14    
    },{
      id: 42,
      color_id:6,
      product_id:38,
      stock:23    
    },{
      id: 43,
      color_id:9,
      product_id:39,
      stock:16    
    },{
      id: 44,
      color_id:6,
      product_id:40,
      stock:11    
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('color_products', null, {});
    
  }
};
