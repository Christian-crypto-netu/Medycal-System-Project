const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const jwt = require('jsonwebtoken');

router.post('/login', authController.login);
router.post('/create-user', authController.createUser);

module.exports = router;
