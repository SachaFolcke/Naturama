'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    calculateAverageRating() {
      const result = [];

      this.getRatings().then((ratings) => {
        ratings.forEach((rating) => result.push(rating.mark))
      }).then(() => {
        let sum = 0;
        result.forEach((value) => {
          sum += value;
        })
        this.average_mark = sum / result.length;
        this.save();
      })
    }

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
      this.belongsTo(models.Image, {
        foreignKey: "id_image",
        onDelete: "CASCADE"
      })
      this.hasMany(models.Rating, {
        foreignKey: "id_post",
        onDelete: "CASCADE"
      });
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