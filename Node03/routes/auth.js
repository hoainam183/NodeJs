var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.controller')

router.get('/login',authController.login)

module.exports = router;
