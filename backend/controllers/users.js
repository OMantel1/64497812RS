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

exports.login = (req, res, next) => {
  db.sequelize.sync()
    .then(() => {
      // console.log('database connected...');
      sequelize.User.findOne({
          where: {
            mail: req.body.mail
          }
        })
        .then(user => {
          if (!user) {
            return res.status(401).json({
              error: "Utilisateur non trouvé"
            })
          }
          console.log(user);
          bcrypt.compare(req.body.mdp, user.mdp)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({
                  error: "pass invalide"
                })
              }
              res.status(200).json({
                userId: user.id,
                token: jwt.sign({
                    userId: user.id
                  },
                  'MY_SECRET_TOKEN', {
                    expiresIn: '24h'
                  })
              })
            })
            .catch(error => res.status(500).json({
              error: "erreur bcrypt"
            }));
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

//supprimer compte user
exports.deleteUser = (req, res, next) => {
  db.sequelize.sync()
    .then(() => {
      // console.log('database connected...');
      sequelize.User.findOne({
          where: {
            mail: req.body.mail
          }
        })
        .then(user => {
          if (!user) {
            return res.status(401).json({
              message: "utilisateur non trouvé"
            })
          }
          bcrypt.compare(req.body.mdp, user.mdp)
            .then(valid => {
              if (!valid) {
                return res.status(402).json({
                  error: "mot de pas incorrect"
                })
              }
              res.status(200).json({
                message: "mot de passe valide"
              })
            })
            .then(() => {
              User.destroy({
                  where: {
                    mail: req.body.mail
                  }
                })
                .then(() => {
                  res.status(201).json({
                    message: "utilisateur bien supprimé"
                  })
                })
                .catch(error => res.status(500).json({
                  error: "erreur bcrypt"
                }));
            })
            .catch(error => res.status(500).json({
              error: "erreur bcrypt"
            }));
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}



/** create user */
exports.signup = (req, res, next) => {
  // if (req.body.mdp !== "" ) {
  let hash = bcrypt.hashSync(req.body.mdp, 10);

  let lastname = req.body.lastname;
  let firstname = req.body.firstname;
  let mail = req.body.mail;
  let mdpHash = hash;
  console.log(mail);

  db.sequelize.sync()
    .then(() => {
      if (req.body.lastname !== "" && req.body.firstname !== "" && req.body.mail !== "") {
        console.log('database connected...');
        sequelize.User.create({
            lastname: lastname,
            firstname: firstname,
            mail: mail,
            mdp: mdpHash
          })
          .then(() => res.status(201).json({
            message: "utilisateur bien crée"
          }))
          .catch(error => console.log("erreur"));
      } else {
        return res.status(400).json({
          message: "champs vide !"
        });
      }

    })
    .catch(error => console.log(error));
}