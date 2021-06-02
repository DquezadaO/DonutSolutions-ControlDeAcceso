'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('arrivals', [
      {
        externalId: undefined,
        visitId: 1,
        providerId: undefined,
        arrivalTime: new Date(),
        residentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'arrivals',
      [
        {
          visitId: 1,
          residentId: 3,
        },
      ],
      {},
    );
  },
};
