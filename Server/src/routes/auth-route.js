const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controllers');

router.post('/google', AuthController.signUp);

module.exports = router;