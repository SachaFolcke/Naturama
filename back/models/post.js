'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
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
      this.hasOne(models.Image, {
        foreignKey: "id_image",
        onDelete: "CASCADE"
      })
    }
  };
  Post.init({
    date: DataTypes.DATE,
    text: DataTypes.TEXT,
    visibility: DataTypes.TINYINT,
    average_mark: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};