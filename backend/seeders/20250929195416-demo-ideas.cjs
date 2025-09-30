'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ideas', [
      {
        title: 'Умная система управления задачами',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Приложение для изучения языков с геймификацией',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Экологичный сервис доставки еды',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Платформа для удаленных команд',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Сервис персонального финансового планирования',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ideas', null, {});
  }
};