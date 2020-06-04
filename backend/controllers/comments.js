const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  Sequelize,
  DataTypes,
  Model
} = require('sequelize');
const sequelize = require('../models/index.js');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const db = require('../models');


/* Nouveau commentaire */
exports.newComment = (req, res, next) => {
  db.sequelize.sync()
    .then(() => {
      console.log('database connected...');
      sequelize.Comment.create({
          UserId: req.body.UserId,
          PostId: req.body.PostId,
          content: req.body.content
        })
        .then(response => res.status(200).json({
          message: "commentaire bien crée"
        }))
        .catch(error => res.status(400).json({
          error: "commentaire n'as pas pu etre crée"
        }));
    })
    .catch(error => res.status(500).json({
      error: "erreur"
    }));
}

exports.updateOneComment = (req, res, next) => {
  db.sequelize.sync()
    .then(post => {
      sequelize.Comment.update({
          content: req.body.content
        }, {
          where: {
            id: req.body.id
          }
        })
        .then(response => res.status(200).json({
          message: "commentaire bien modifié"
        }))
        .catch(error => console.log("ERREUR updateValue"));
    })
    .catch(error => res.status(500).json({
      error
    }));
}

exports.deleteOneComment = (req, res, next) => {
  db.sequelize.sync()
    .then(() => {
      console.log('database connected...');
      sequelize.Comment.destroy({
          where: {
            id: req.body.id
          }
        })
        .then(comment => {
          console.log(comment);
          res.status(200).json({
            message: "Commentaire bien supprimé"
          });
        })
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
}