module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('visitSchedules', [
      {
        start: new Date(),
        end: new Date(),
        visitId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'visitSchedules',
      [
        {
          visitId: 1,
        },
      ],
      {},
    );
  },
};
