'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING
      },

      createdAt: {
        type: Sequelize.DATE},

      updatedAt: {
        type: Sequelize.DATE
      }
   });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
     
  }
};
