'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('colors', [{
      id:1,
      name: 'Red',
     },{
      id:2,
      name: 'Pink',
     },{
      id:3,
      name:'Orange'
     },{
      id:4,
      name:'Black'
     },{
      id:5,
      name:'Blue'
     },{
      id:6,
      name:'Purple'
     },{
      id:7,
      name:'Brown'
     },{
      id:8,
      name:'Gold'
     },{
      id:9,
      name:'Cyan'
     },{
      id:10,
      name:'Turqoise'
     },{
      id:11,
      name:'Silver'
     },], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('colors', null, {});
    
  }
};
