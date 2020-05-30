'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // id: DataTypes.INTEGER,
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    mail: DataTypes.TEXT,
    mdp: DataTypes.TEXT
  }, {});
  User.associate = function (models) {
    models.User.hasMany(models.Post);
  };
  return User;
};