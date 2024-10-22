var express = require('express');
var router = express.Router();
const sendMail = require("../utils/mail");
const authMiddleWare = require('../middlewares/auth.middleware')

/* GET home page. */
router.get('/',authMiddleWare, function(req, res, next) {
  res.render('index', { req });
});

router.get('/send-mail',async (req,res) => {
  const info = await sendMail('nhn1832004@gmail.com','Hello');
  res.json(info);
})

module.exports = router;
