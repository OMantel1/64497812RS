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
const db = require('../models');


/*** findAll posts */
exports.getUserWall = (req, res, next) => {
  db.sequelize.sync()
    .then(() => {
      console.log('database connected...');
      sequelize.Post.findAll({

          include: {
            model: sequelize.User,
            attributes: ["firstname", "lastname", "admin"]
          },
          order: [
            ['createdAt', 'DESC']
          ]
        })
        .then(posts => {
          console.log(posts);
          res.status(200).json(posts);
        })
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
}

exports.newPost = (req, res, next) => {
  db.sequelize.sync()
    .then(() => {
      console.log('database connected...');
      sequelize.Post.create({
          title: req.body.title,
          content: req.body.content,
          url_image: req.body.url_image,
          UserId: req.body.UserId,

        })
        .then()
        .catch();
    })
    .catch(error => console.log(error));
}

exports.getOnePost = (req, res, next) => {
  db.sequelize.sync()
    .then(() => {
      console.log('database connected...');
      sequelize.Post.findOne({
          where: {
            id: req.body.id
          },
          include: {
            model: sequelize.User,
            attributes: ["firstname", "lastname", "admin"]
          }
        })
        .then(post => {
          console.log(post);
          res.status(200).json(post);
        })
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
}

exports.deleteOnePost = (req, res, next) => {
  db.sequelize.sync()
    .then(() => {
      console.log('database connected...');
      sequelize.Post.destroy({
          where: {
            id: req.body.id
          }
        })
        .then(post => {
          console.log(post);
          res.status(200).json({
            message: "post bien supprimé"
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

exports.updateOnePost = (req, res, next) => {
  db.sequelize.sync()
    .then(post => {
      sequelize.Post.update({
          title: req.body.title,
          content: req.body.content,
          url_image: req.body.url_image
        }, {
          where: {
            id: req.body.id
          }
        })
        .then(response => res.status(200).json({
          message: "post bien modifié"
        }))
        .catch(error => console.log("ERREUR updateValue"));
    })
    .catch(error => res.status(500).json({
      error
    }));
}