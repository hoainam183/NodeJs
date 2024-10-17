'use strict';

/** @type {import('sequelize-cli').Migration} */
const { faker } = require('@faker-js/faker'); 
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const users = [];
    for(let i =0; i<50;i++){
      users.push({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        status: faker.datatype.boolean(),
        created_at: faker.date.past(),
        updated_at: faker.date.past(),
        address: faker.location.streetAddress(),
      })
    } 
    await queryInterface.bulkInsert('users',users)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users')
  }
};
