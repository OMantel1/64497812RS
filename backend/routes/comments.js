const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
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


module.exports = router;