'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Profile, {
        foreignKey: "id_profile",
        onDelete: "CASCADE"
      })
      this.belongsTo(models.Post, {
        foreignKey: "id_post",
        onDelete: "CASCADE"
      })
    }
  };
  Rating.init({
    date: DataTypes.DATE,
    mark: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};