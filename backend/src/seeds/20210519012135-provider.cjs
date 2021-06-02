'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('providers', [
      {
        firstName: 'Ignacio',
        lastName: 'Briones',
        run: '234567890',
        phone: '+56998765432',
        licensePlate: 'ASD-123',
        backofficeId: 1,
        condominiumId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Pamela',
        lastName: 'Jiles',
        run: '200724437',
        phone: '+56978631267',
        licensePlate: 'ASD-124',
        backofficeId: 1,
        condominiumId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'providers',
      [
        {
          firstName: 'Ignacio',
          lastName: 'Briones',
          run: '234567890',
        },
        {
          firstName: 'Pamela',
          lastName: 'Jiles',
          run: '200724437',
        },
      ],
      {},
    );
  },
};
