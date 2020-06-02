'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    // id_post: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    url_image: DataTypes.TEXT,
    // id_user: DataTypes.INTEGER
  }, {});
  Post.associate = function (models) {
    models.Post.belongsTo(models.User);
    models.Post.hasMany(models.Comment);
  };
  return Post;
};