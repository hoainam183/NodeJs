var express = require('express');
var router = express.Router();
const userController = require('../controllers/api/v1/user.controller')
router.get('/v1/users', userController.index)
router.get('/v1/users/:id', userController.find)
router.post('/v1/users', userController.store)
module.exports = router;
