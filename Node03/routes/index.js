var express = require('express');
var router = express.Router();
const sendMail = require("../utils/mail");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send-mail',async (req,res) => {
  const info = await sendMail('nhn1832004@gmail.com','Hello');
  res.json(info);
})

module.exports = router;
