var express = require('express');
var router = express.Router();
const sendMail = require("../utils/mail");
const authMiddleWare = require('../middlewares/auth.middleware')
const roleController = require('../controllers/role.controller')

/* GET home page. */
router.get('/',authMiddleWare, function(req, res, next) {
  res.render('index', { req });
});

router.get('/send-mail',async (req,res) => {
  const info = await sendMail('nhn1832004@gmail.com','Hello');
  res.json(info);
})

router.get('/roles',roleController.index);
router.get('/roles/add',roleController.add);
router.post('/roles/add',roleController.handleAdd);
module.exports = router;
