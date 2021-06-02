'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      licensePlate: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      carBrand: {
        type: Sequelize.STRING,
      },
      carModel: {
        type: Sequelize.STRING,
      },
      carColor: {
        type: Sequelize.STRING,
      },
      unitId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'units',
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
    await queryInterface.dropTable('cars');
  },
};
