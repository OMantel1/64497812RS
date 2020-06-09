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

// let textRegex = /^((?=.*[A-Z])|(?=.*[a-z]))([- !?"()@:;,.'aéàèùêûiîçàa-zA-Z]{1,2000})$/;
// let titleRegex = /((?=.*[A-Z])|(?=.*[a-z]))([- !?"()@:;,.'aéàèùêûiîçàa-zA-Z]{1,300})$/;


/***** FIND ALL POSTS *****/
exports.getUserWall = (req, res, next) => {
  //récupération de tous les posts présents dans la bdd
  sequelize.Post.findAll({
      include: [{
          model: sequelize.User,
          attributes: ["firstname", "lastname", "admin"]
        },
        {
          model: sequelize.Comment
        }
      ],
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
  //vérifications des données
  try {
    if (req.body.content === "") throw "Veuillez renseigner un contenu";
    if (req.body.title === "") throw "Veuillez renseigner un titre";
    // if (!textRegex.test(req.body.content)) throw "Caracteres utilisés interdits";
    // if (!titleRegex.test(req.body.title)) throw "Caracteres utilisés interdits"
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }
  //creation d'un nouveau post
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
  //récupération d'un post avec ses commentaires
  sequelize.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [{
          model: sequelize.User,
          attributes: ["firstname", "lastname"]
        },
        {
          model: sequelize.Comment,
          include: [{
            model: sequelize.User,
            attributes: ["firstname", "lastname"]
          }]
        }
      ],
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
        id: req.params.id
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
  //vérication des données
  try {
    if (req.body.content === "") throw "Veuillez renseigner un contenu";
    if (req.body.title === "") throw "Veuillez renseigner un titre";
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }
  //modification du post
  sequelize.Post.update({
      title: req.body.title,
      content: req.body.content,
      url_image: req.body.url_image
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(response => res.status(200).json({
      message: "post bien modifié"
    }))
    .catch(error => console.log("ERREUR updateValue"));
}