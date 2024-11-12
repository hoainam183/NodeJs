var express = require('express');
var router = express.Router();
const userController = require("../controllers/user.controller.js")
const {User,Phone, Post,Course} = require('../models/index.js');
const permission = require('../middlewares/permission.middleware.js')
/* GET users listing. */
router.get('/',permission('user.read'), userController.index);

router.get('/add', permission('user.create'), userController.add);
router.post('/add', permission('user.create'), userController.handleAdd);

router.get('/edit/:id',permission('user.update'), userController.edit);
router.post('/edit/:id',permission('user.update'), userController.handleEdit);

router.post("/delete/:id", permission('user.delete'), userController.delete);

router.get('/permission/:id',permission('user.update'), userController.permission);
router.post('/permission/:id',permission('user.update'), userController.handlePermission);

router.get('/test-assoc',async(req,res) => {
    // Lấy dữ liệu liên kết --> Lấy được instance
    // Ví dụ: Từ user --> Lấy phone --> Lấy được instance của user
    // const user = await User.findByPk(1);
    // const phone = await user.getPhone(); // magic method
    // res.json({phone})

    // const phone = await Phone.findByPk(4);
    // const user = await phone.getUser();

    // const user = await User.findByPk(12);
    // const posts = await user.getPosts();

    // const user = await User.findOne({
    //     where:{id:12},
    //     include:{
    //         model:Post,
    //         as:'posts'
    //     }
    // })

    // const posts = user.posts;

    // const posts = await Post.findAll({
    //     include:{
    //         model: User,
    //         as:'user'
    //     }
    // })

    // const user = await User.findOne({
    //     where:{id:1},
    //     include:{
    //         model: Course,
    //         as:'courses'
    //     }
    // })

    const course = await Course.findOne({
        where:{id:2},
        include:{
            model:User,
            as:'users'
        }
    })

    res.json({course})
    
    
})

module.exports = router;
