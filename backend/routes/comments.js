const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authRole = require('../middleware/authRole');
const comments = require('../controllers/comments');
const db = require('../models');


const {
    Sequelize,
    DataTypes,
    Model
  } = require('sequelize');

// router.get('/', auth, comments.getAllComments);
router.post('/new',auth, comments.newComment);
router.put('/:id', auth, comments.updateOneComment);
router.delete('/:id', auth, comments.deleteOneComment);

router.get('/user/:id', auth, authRole, comments.getUserComments); //ajouter middleware admin
router.delete('/admin/:id', auth, authRole, comments.deleteOneComment); //ajouter middleware admin


module.exports = router;