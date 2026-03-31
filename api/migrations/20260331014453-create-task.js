'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      projectId: {
        type: Sequelize.UUID,
        references: {
          model: 'Projects',
          key: 'id'
        }
      },

        userId: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id'
          }
        },

      
        
        createAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE


    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Tasks'); 
  }
};
