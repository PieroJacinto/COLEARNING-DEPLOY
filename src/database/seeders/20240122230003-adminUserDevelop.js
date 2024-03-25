'use strict';

const bcrypt = require('bcryptjs');

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

    await queryInterface.bulkInsert('users', [{
      id: 1,
      first_name: 'Admin',
      last_name: 'Admin',
      email: 'admin@admin.com',
      password: bcrypt.hashSync('admin1234', 10),
      status: 1,
      image: "avatar-1.png",
      address: "Calle Admin",
      profile_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      id: 2,
      first_name: 'Jose',
      last_name: 'Diaz',
      email: 'josediaz@cliente.com',
      password: bcrypt.hashSync('cliente1234', 10),
      status: 1,
      image: "avatar-2.png",
      address: "Roca 633",
      profile_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      id: 3,
      first_name: 'Leo',
      last_name: 'Messi',
      email: 'leomessi@cliente.com',
      password: bcrypt.hashSync('cliente1234', 10),
      status: 1,
      image: "avatar-3.png",
      address: "Palm street 43",
      profile_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      id: 4,
      first_name: 'Melina',
      last_name: 'Suarez',
      email: 'melinasuarez@cliente.com',
      password: bcrypt.hashSync('cliente1234', 10),
      status: 1,
      image: "avatar-4.png",
      address: "Mendoza 55",
      profile_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      id: 5,
      first_name: 'Rosa',
      last_name: 'Carabajal',
      email: 'rosacarabajal@cliente.com',
      password: bcrypt.hashSync('cliente1234', 10),
      status: 1,
      image: "avatar-5.png",
      address: "Belgrano(s) 1502",
      profile_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      id: 6,
      first_name: 'Jessica',
      last_name: 'Gomez',
      email: 'jessicagomez@empleado.com',
      password: bcrypt.hashSync('cliente1234', 10),
      status: 1,
      image: "avatar-6.png",
      address: "Belgrano(s) 1502",
      profile_id: 3,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  }
};
