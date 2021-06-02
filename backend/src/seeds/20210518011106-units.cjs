module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('units', [
      {
        number: 'UnidadCondominio',
        condominiumId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        number: '101-A',
        condominiumId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        number: '102-A',
        condominiumId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        number: '103-A',
        condominiumId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'units',
      [
        {
          number: 'UnidadCondominio',
        },
        {
          number: '101-A',
        },
        {
          number: '102-A',
        },
        {
          number: '103-A',
        },
      ],
      {},
    );
  },
};
