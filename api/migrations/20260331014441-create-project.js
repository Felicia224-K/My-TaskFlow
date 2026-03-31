'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Projects', { 
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
       },
      createdAt: {
        type: Sequelize.DATE},

      updatedAt: {
        type: Sequelize.DATE
       }

      });
     
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Projects');
   
  }
};
