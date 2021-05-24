'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tagasso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post, {
        foreignKey: "id_post",
      })
      this.belongsTo(models.Tag, {
        foreignKey: "id_tag",
        hooks: true
      })

      this.addHook("afterCreate", (instance, options) => {
        instance.getTag().then((tag) => { tag.updateCount() })
      })
    }
  };
  Tagasso.init({
    id_tag: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'Tagasso',
  });
  return Tagasso;
};