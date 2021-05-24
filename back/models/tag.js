'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {

    updateCount() {
      this.countPosts()
          .then((count) => {
            this.count = count;
            this.save();
          })
    }

    static associate(models) {
      this.belongsToMany(models.Post, {
        through: models.Tagasso,
        foreignKey: "id_tag",
        hooks: true
      })
    }
  };
  Tag.init({
    name: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};