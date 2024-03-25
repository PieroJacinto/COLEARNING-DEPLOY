'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('profiles', [{
      id: 1,
      name: "Administrador",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: "Empleado",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      name: "Cliente",
      created_at: new Date(),
      updated_at: new Date()
    }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('profiles', null, {});
  }
};
