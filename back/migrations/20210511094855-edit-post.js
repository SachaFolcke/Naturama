'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.addColumn(
          "Posts",
          "id_image",
          {
            type: Sequelize.INTEGER,
            onDelete: "CASCADE",
            references: {
              model: "Images",
              key: "id",
              as: "id_image"
            }
          }
      ),
      queryInterface.addColumn(
          "Posts",
          "visibility",
          {
            type: Sequelize.TINYINT
          }
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.removeColumn(
          "Posts",
          "id_image"
      ),
      queryInterface.removeColumn(
          "Posts",
          "visibility"
      )
    ])
  }
};
