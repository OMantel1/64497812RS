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


/***** FIND ALL POSTS *****/
exports.getUserWall = (req, res, next) => {
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
}

/***** NEW POSTS *****/
exports.newPost = (req, res, next) => {
  sequelize.Post.create({
    UserId: req.body.UserId,
    title: req.body.title,
    content: req.body.content,
    url_image: req.body.url_image
  })
  .then(response => res.status(200).json({
    message: "Post bien crée"
  }))
  .catch(error => res.status(400).json({
    error: "Ce post n'as pas pu etre crée"
  }));
}

/***** GET ONE POSTS *****/
exports.getOnePost = (req, res, next) => {
  sequelize.Post.findOne({
    where: {
      id: req.body.id
    },
    include: {
      model: sequelize.Comment
      // attributes: ["firstname", "lastname", "admin"]
    }
  })
  .then(post => {
    console.log(post);
    res.status(200).json(post);
  })
  .catch(error => res.status(400).json({
    error
  }));
}


/***** DELETE ON POST *****/
exports.deleteOnePost = (req, res, next) => {
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
}


/***** UPDATE ONE POST *****/
exports.updateOnePost = (req, res, next) => {
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
}