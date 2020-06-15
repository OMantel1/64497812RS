const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authRole = require('../middleware/authRole');
const user = require('../controllers/users');
const db = require('../models');


const {
    Sequelize,
    DataTypes,
    Model
  } = require('sequelize');

router.get('/:id', auth, user.getUsername);
// router.get('/content/:id', auth, user.getuserContent); //auth admin a ajouter
router.post('/login', user.login);
router.post('/signup', user.signup);
router.delete('/delete', auth, user.deleteAccount);

router.get('/', auth, authRole, user.getAllUsers); //ajouter middleware Admin
router.delete('/delete/:id', auth, authRole, user.deleteAccountAuth); //ajouter middleware Admin

module.exports = router;