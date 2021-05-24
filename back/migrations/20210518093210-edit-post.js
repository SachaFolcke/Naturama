'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          "Posts",
          "nb_votes",
          {
            type: Sequelize.INTEGER,
          }
      )]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
          "Posts",
          "nb_votes"
      )
    ])
  }
};
