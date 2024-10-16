'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('phones',{
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
      },
      phone:Sequelize.STRING(15),
      user_id:{
        type:Sequelize.INTEGER,
        references:{
          model:{
            tableName:'users',
          },
          key:'id',
        }
      },
      created_at:Sequelize.DATE,
      updated_at:Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('phones')
  }
};
