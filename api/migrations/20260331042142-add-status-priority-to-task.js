'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'status', {
      type: Sequelize.ENUM('pending', 'in_progress', 'completed'),
      defaultValue: 'pending',
    });

    await queryInterface.addColumn('Tasks', 'priority', {
      type: Sequelize.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tasks', 'status');
    await queryInterface.removeColumn('Tasks', 'priority');
  }
};
