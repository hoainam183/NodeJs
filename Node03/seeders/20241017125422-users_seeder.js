"use strict";

/** @type {import('sequelize-cli').Migration} */
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
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

    const salt = bcrypt.genSaltSync(10);

    const users = [
      {
        fullname: "Hoai Nam",
        email: "nhn1832004@gmail.com",
        status: true,
        password:bcrypt.hashSync('123456', salt),
        created_at: new Date(),
        updated_at: new Date(), 
      }, 
    ];
    // for(let i =0; i<50;i++){
    //   users.push({
    //     fullname: faker.person.fullName(),
    //     email: faker.internet.email(),
    //     status: faker.datatype.boolean(),
    //     created_at: faker.date.past(),
    //     updated_at: faker.date.past(),
    //     address: faker.location.streetAddress(),
    //   })
    // }
    await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users");
  },
};
