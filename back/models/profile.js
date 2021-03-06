'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {

    updateFollowerCount() {
      this.getFollows().then((follows) => {
        this.nb_followers = follows.length;
        this.save();
      })
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE"
      })

      this.belongsTo(models.Image, {
        foreignKey: "id_image_profile",
        onDelete: "CASCADE"
      })
      this.belongsTo(models.Image, {
        foreignKey: "id_image_banner",
        onDelete: "CASCADE"
      })
      this.hasMany(models.Follow, {
        foreignKey: "id_followee",
        onDelete: "CASCADE"
      })
      this.hasMany(models.Follow, {
        foreignKey: "id_follower",
        onDelete: "CASCADE"
      })
    }
  };
  Profile.init({
    last_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    birthday: DataTypes.DATE,
    bio: DataTypes.TEXT,
    location: DataTypes.STRING,
    nb_followers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};