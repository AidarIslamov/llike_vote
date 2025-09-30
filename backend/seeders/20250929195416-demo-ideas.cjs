'use strict';

module.exports = {
   async up (queryInterface, Sequelize) {
    const existingCount = await queryInterface.sequelize.query(
      'SELECT COUNT(*) FROM ideas',
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    const count = parseInt(existingCount[0].count);

    if (count === 0) {
      await queryInterface.bulkInsert('ideas', [
        {
          title: 'Умная система управления задачами',
        },
        {
          title: 'Приложение для изучения языков с геймификацией',
        },
        {
          title: 'Экологичный сервис доставки еды',
        },
        {
          title: 'Платформа для удаленных команд',
        },
        {
          title: 'Сервис персонального финансового планирования',
        },
        {
          title: 'AI-ассистент для здоровья и wellness',
        },
        {
          title: 'Социальная сеть для любителей книг',
        },
        {
          title: 'Сервис аренды локальных гидов',
        },
        {
          title: 'Платформа для онлайн-курсов с VR',
        },
        {
          title: 'Умный домашний сад с автоматическим поливом',
        },
        {
          title: 'Приложение для медитации и ментального здоровья',
        },
        {
          title: 'Сервис доставки локальных фермерских продуктов',
        },
        {
          title: 'Платформа для каршеринга электромобилей',
        },
        {
          title: 'AI-помощник для создания контента',
        },
        {
          title: 'Социальная платформа для волонтерства',
        }
      ], {});
    }
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ideas', null, {});
  }
};