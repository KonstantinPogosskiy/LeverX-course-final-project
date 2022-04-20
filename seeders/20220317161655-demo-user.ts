'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        email: 'John@gmail.com',
        password: '123qwe',
        isAuth: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'Sergey@gmail.com',
        password: 'qwe123',
        isAuth: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
