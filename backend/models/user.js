'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // id: DataTypes.INTEGER,
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    mail: DataTypes.TEXT,
    mdp: DataTypes.TEXT,
    admin: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    models.User.hasMany(models.Post);
    models.User.hasMany(models.Comment);
  };
  return User;
};