'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    // id_comment: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    models.Comment.belongsTo(models.Post);
    models.Comment.belongsTo(models.User);
  
  };
  return Comment;
};