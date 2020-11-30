'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const events = Array.from(new Array(10)).map((_, i) => ({
      creatorId: (i % 2) + 1,
      title: `Event #${i + 1}`,
      location: `Location ${i + 1}`,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Events', events, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', null, {});
  },
};
