'use strict';

const users = [
  ['Mark', 'Sparks'],
  ['Tony', 'Stark'],
  ['Mary', 'Taylor'],
  ['Jimmy', 'Kim'],
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      users.map(([firstName, lastName]) => ({
        firstName,
        lastName,
        email: `${firstName}${lastName}@gmail.com`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
