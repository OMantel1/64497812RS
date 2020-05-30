const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const user = require('../controllers/users');
const db = require('../models');


const {
    Sequelize,
    DataTypes,
    Model
  } = require('sequelize');

router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/signup', user.signup);

router.post('/delete', auth, user.deleteUser);

module.exports = router;