'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('votes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idea_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ideas',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      client_ip: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Добавляем составной уникальный индекс
    await queryInterface.addIndex('votes', {
      fields: ['client_ip', 'idea_id'],
      unique: true,
      name: 'votes_client_ip_idea_id_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('votes');
  }
};
