'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('categories', [
      {
       id:1,
       name:'Bases',
       image:'category1.jpeg'
      },
      {
        id:2,
        name:'Rubores',
        image:'category2.jpeg'
       },
       {
        id:3,
        name:'Delineadores',
        image:'category3.jpg'
       },
       {
        id:4,
        name:'Labiales',
        image:'category4.jpg'
       },

    ], {});
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('categories', null, {});
    
  }
};
