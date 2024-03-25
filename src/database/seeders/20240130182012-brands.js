'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('brands', [{
      id:1,
      name: 'YSL',
     },{
      id:2,
      name: 'Dior',
     },{
      id:3,
      name:'Rare'
     },{
      id:4,
      name:'Fenty'
     },{
      id:5,
      name:'Loreal'
     },{
      id:6,
      name:'Maybelline'
     },{
      id:7,
      name:'Revlon'
     },{
      id:8,
      name:'Milani'
     },{
      id:9,
      name:'Nyx'
     },], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('brands', null, {});
  }
};
