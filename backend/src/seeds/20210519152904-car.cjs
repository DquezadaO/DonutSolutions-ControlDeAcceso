'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cars', [
      {
        unitId: 3,
        licensePlate: 'FT7107',
        carBrand: 'Citroen',
        carModel: 'Yagan',
        carColor: 'Naranjo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        unitId: 3,
        licensePlate: 'EFGH34',
        carBrand: 'Mitsubishi',
        carModel: 'ECLIPSE',
        carColor: 'Morado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        unitId: 2,
        licensePlate: 'IJKL56',
        carBrand: 'Hyundai',
        carModel: 'ACCENT',
        carColor: 'Gris',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        unitId: 4,
        licensePlate: 'C321',
        carBrand: 'Hyundai',
        carModel: 'ACCENT',
        carColor: 'Rojo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'cars',
      [
        {
          unitId: 1,
          licensePlate: 'ABCD12',
          carBrand: 'Toyota',
          carModel: 'AURIS',
          carColor: 'Azul',
        },
        {
          unitId: 1,
          licensePlate: 'EFGH34',
          carBrand: 'Mitsubishi',
          carModel: 'ECLIPSE',
          carColor: 'Morado',
        },
        {
          unitId: 2,
          licensePlate: 'IJKL56',
          carBrand: 'Hyundai',
          carModel: 'ACCENT',
          carColor: 'Gris',
        },
      ],
      {},
    );
  },
};
