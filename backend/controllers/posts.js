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
      sequelize.Post.findAll({
          where: {
            id_post: req.body.id
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