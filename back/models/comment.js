'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
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
  Comment.init({
    date: DataTypes.DATE,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};