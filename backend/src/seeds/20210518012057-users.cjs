module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'Vicente',
        lastName: 'Aguilera',
        email: 'vicente@asdf.com',
        password: '$2b$10$wT9gqfBh9uiEH4Le1zBZ7.JEXMYfs5uEf0sYaReleezhhP.iRT6bG',
        role: 'backoffice',
        phone: '+56 9 99887766',
        unitId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Rafael',
        lastName: 'Abusleme',
        email: 'rafael@asdf.com',
        password: '$2b$10$wT9gqfBh9uiEH4Le1zBZ7.JEXMYfs5uEf0sYaReleezhhP.iRT6bG',
        role: 'guardia',
        phone: '+56 9 99887766',
        unitId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Tien',
        lastName: 'Villalobos',
        email: 'tien@asdf.com',
        password: '$2b$10$wT9gqfBh9uiEH4Le1zBZ7.JEXMYfs5uEf0sYaReleezhhP.iRT6bG',
        role: 'residente',
        phone: '+56 9 99887766',
        unitId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Guardia',
        lastName: 'Guardia',
        email: 'guardia@asdf.com',
        password: '$2b$10$wT9gqfBh9uiEH4Le1zBZ7.JEXMYfs5uEf0sYaReleezhhP.iRT6bG',
        role: 'guardia',
        phone: '+56 9 99887765',
        unitId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Backoffice',
        lastName: 'Backoffice',
        email: 'backoffice@asdf.com',
        password: '$2b$10$wT9gqfBh9uiEH4Le1zBZ7.JEXMYfs5uEf0sYaReleezhhP.iRT6bG',
        role: 'backoffice',
        phone: '+56 9 99887764',
        unitId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Residente',
        lastName: 'Residente',
        email: 'residente@asdf.com',
        password: '$2b$10$wT9gqfBh9uiEH4Le1zBZ7.JEXMYfs5uEf0sYaReleezhhP.iRT6bG',
        role: 'residente',
        phone: '+56 9 99887763',
        unitId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'users',
      [
        {
          email: 'asdf@asdf.com',
        },
      ],
      {},
    );
  },
};
