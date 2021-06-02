module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('visits', [
      {
        firstName: 'Alex',
        lastName: 'Bustos',
        run: '20888777-8',
        phone: '+56 9 13313399',
        licensePlate: 'ASDF-12',
        residentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'visits',
      [
        {
          run: '20888777-8',
        },
      ],
      {},
    );
  },
};
