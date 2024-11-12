var express = require('express');
var router = express.Router();
const userController = require('../controllers/api/v1/user.controller')
router.get('/v1/users', userController.index)
module.exports = router;
