'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        value: 'ADMIN',
        description: 'Administrator',
      },
      {
        value: 'USER',
        description: 'Regular user',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
