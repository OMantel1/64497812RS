const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('./models/index.js');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const db = require('./models');

/********************/
/********** USERs **********/
/********************/
// 
/** create user */
// db.sequelize.sync()
// .then(()=> {
//   console.log('database connected...');
//   sequelize.User.create({
//     lastname:"test",
//     firstname:"test",
//     mail:"test@test.com",
//     mdp:"test"
//   })
//   .then()
//   .catch();
// })
// .catch(error => console.log(error));

/*** findOne user */
// sequelize.sync()
// .then(()=> {
//   console.log('database connected...');
//   User.findOne({
//     where: {id: 2}
//   })
//   .then(response => console.log(response.firstname))
//   .catch(error => res.status(400).json({error}));
// })
// .catch(err => console.log("ERREUR"));

/*** delete user */
// sequelize.sync()
// .then(()=> {
//   console.log('database connected...');
//   db.User.destroy({
//     where: {mail: "jcvd"}
//   })
//   .then(response => console.log(response))
//   .catch(err => console.log("ERREUR destroy"));
// })
// .catch(error => console.log(error));



/********************/
/********** POSTs **********/
/********************/


/*** create post ***/
// sequelize.sync()
// .then(()=> {
//   console.log('database connected...');
//   Post.create({
//     title: "nouveau titre",
//     content:"test2 avec foreign key.",
//     url_image:"https://cdn.pixabay.com/photo/2016/11/19/21/05/bass-guitar-1841186_960_720.jpg",
//     id_user: 1
//   })
//   .then()
//   .catch();
// })
// .catch(error => console.log(error));

/*** findAll posts */
// sequelize.sync()
// .then(()=> {
//   console.log('database connected...');
//   Post.findAll()
//   .then(response => console.log("réponse bien récupérée!!"))
//   .catch(error => res.status(400).json({error}));
// })
// .catch(err => console.log("ERREUR"));

/*** findOne posts */
// sequelize.sync()
// .then(()=> {
//   console.log('database connected...');
//   Post.findOne({ where: {id_post: 2}})
//   .then(response => console.log(response.content))
//   .catch(error => res.status(400).json({error}));
// })
// .catch(err => console.log("ERREUR"));

/*** update post */
// sequelize.sync()
// .then(()=> {
//   console.log('database connected...');
//   Post.findOne({
//     where: {id_post: 2}
//   })
//   .then(posts =>{
//     console.log(posts.id_post);
//     posts.update({
//       content: 'mon post modifié 3 fois' 
//     })
//     .then(response => console.log("post bien modifié !!!"))
//     .catch(err => console.log("ERREUR setdatavalue"));
//   })
//   .catch();
// })
// .catch(err => console.log("ERREUR"));

/********************/
/********** comment **********/
/********************/

/*** create comment ***/
// sequelize.sync()
// .then(()=> {
//   console.log('database connected...');
//   Comment.create({
//     content:"voici mon deuxieme post",
//     id_user:1,
//     id_post: 1
//   })
//   .then()
//   .catch();
// })
// .catch(err => console.log(error));

/*** findAll comment */
// sequelize.sync()
// .then(()=> {
//   console.log('database connected...');
//   comment.findAll({ where : {id_post : 1})
//   .then(response => console.log("réponse bien récupérée!!"))
//   .catch(error => res.status(400).json({error}));
// })
// .catch(err => console.log("ERREUR"));

/*** findOne comment */
// sequelize.sync()
// .then(()=> {
//   console.log('database connected...');
//   Comment.findOne({ where: {id_comment: 2}})
//   .then(response => console.log(response.content))
//   .catch(error => res.status(400).json({error}));
// })
// .catch(err => console.log("ERREUR"));

/*** update comment */
// sequelize.sync()
// .then(()=> {
//   console.log('database connected...');
//   Comment.findOne({
//     where: {id_comment: 2}
//   })
//   .then(comments =>{
//     console.log(posts.id_comment);
//     comments.update({
//       content: 'mon commentaire modifié 3 fois' 
//     })
//     .then(response => console.log("commentaire bien modifié !!!"))
//     .catch(err => console.log("ERREUR setdatavalue"));
//   })
//   .catch();
// })
// .catch(err => console.log("ERREUR"));

const app = express();

//Erreurs de cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// //enregistre routers
app.use('/user', require('./routes/user'));
app.use('/posts', require('./routes/posts'));

module.exports = app;