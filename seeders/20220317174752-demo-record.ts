'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('records', [
      {
        author: 'Black Sabbath',
        name: 'War',
        description: 'Performing "War Pigs" live for the very last time.',
        price: 3000,
        picture: 'hgd45fh5433hf4g3hf4gh3f5ghf4gh5f3g35h.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author: 'Iron Maiden',
        name: 'Fear',
        description: 'Performing live for the very last time.',
        price: 4000,
        picture: 'fdd45fh5433hf4ghj5f3g35fdh.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author: 'Kiss',
        name: 'Made',
        description: 'Performing "War Pigs" live for the very last time.',
        price: 5000,
        picture: 'hgd45fh5433hf4g3hf4gh3f5ghf4gh5f3g35h.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author: 'Deep Purple',
        name: 'Child In Time',
        description: 'Performing live for the very last time.',
        price: 7000,
        picture: 'fdd45fh5433hf4ghj5f3g35fdh.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        author: 'Black Sabbath',
        name: 'The End',
        description: 'Performing "War Pigs" live for the very last time.',
        price: 9000,
        picture: 'hgd45fh5433hf4g3hf4gh3f5ghf4gf5f3g35h.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('records', null, {});
  }
};
