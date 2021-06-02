'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('arrivals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      externalId: {
        type: Sequelize.INTEGER,
      },
      visitId: {
        type: Sequelize.INTEGER,
      },
      providerId: {
        type: Sequelize.INTEGER,
      },
      arrivalTime: {
        type: Sequelize.DATE,
      },
      residentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('arrivals');
  },
};
