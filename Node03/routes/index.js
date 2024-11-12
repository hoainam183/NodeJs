var express = require('express');
var router = express.Router();
const sendMail = require("../utils/mail");
const authMiddleWare = require('../middlewares/auth.middleware')
const roleController = require('../controllers/role.controller')
const permission = require('../middlewares/permission.middleware')

/* GET home page. */
router.get('/',authMiddleWare, function(req, res, next) {
  res.render('index', { req });
});

router.get('/send-mail',async (req,res) => {
  const info = await sendMail('nhn1832004@gmail.com','Hello');
  res.json(info);
})

router.get('/roles',permission('role.read'),roleController.index);
router.get('/roles/add', permission('role.create'),roleController.add);
router.post('/roles/add', permission('role.create'),roleController.handleAdd);

router.get('/roles/edit/:id',permission('role.update'),roleController.edit);
router.post('/roles/edit/:id',permission('role.update'),roleController.handleEdit);

router.post('/roles/delete/:id',permission('role.delete'),roleController.delete);
module.exports = router;
