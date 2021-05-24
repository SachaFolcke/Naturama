'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tagassos', {
      id_tag: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Tags",
          key: "id",
          as: "id_tag",
        }
      },
      id_post: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Posts",
          key: "id",
          as: "id_post",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tagassos');
  }
};