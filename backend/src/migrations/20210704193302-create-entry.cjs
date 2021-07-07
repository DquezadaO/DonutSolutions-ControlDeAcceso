'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      unitId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'units',
          key: 'id',
        },
      },
      visitId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'visits',
          key: 'id',
        },
      },
      type: {
        type: Sequelize.STRING,
      },
      manual: {
        type: Sequelize.BOOLEAN,
      },
      licensePlate: {
        type: Sequelize.STRING,
      },
      entryTimestamp: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('entries');
  },
};
