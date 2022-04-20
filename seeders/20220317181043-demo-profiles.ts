'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('profiles', [
      {
        user_id: 1,
        firstName: 'John',
        lastName: "Malkovich",
        birthDate: '01.03.1999',
        avatar: 'fgf65gh5f6gh645f466.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        firstName: 'Sergey',
        lastName: 'Ivanov',
        birthDate: '12.12.2001',
        avatar: 'fgf65gh5f6gh645f466.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('profiles', null, {});
  }
};
