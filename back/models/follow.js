'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Profile, {
        foreignKey: "id_follower",
        onDelete: "CASCADE"
      })
      this.belongsTo(models.Profile, {
        foreignKey: "id_followee",
        onDelete: "CASCADE"
      })
    }
  };
  Follow.init({}, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};