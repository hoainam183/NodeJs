'use strict';

/** @type {import('sequelize-cli').Migration} */
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
    await queryInterface.bulkInsert('groups',[
      {
        name:'Administrator',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name:'Manager',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name:'Staff',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name:'Subcriber',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('groups')
  }
};
