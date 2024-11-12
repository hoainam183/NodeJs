const { Model } = require('sequelize');
const {User, Role, Permission} = require('../models/index')
module.exports = (value) => {
    return async (req,res,next) =>{
        // Lấy danh sách quyền của user đang đăng nhập
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            include: {
                model: Role,
                as: 'roles',
                include: {
                    model: Permission,
                    as: 'permissions',
                }
            },
        })
        const permissions = []; // chứa tên các permission của user đagn dăng nhập
        console.log(user.roles);
        
        if(user.roles.length){
            user.roles.forEach(role => {
                role.permissions.forEach(permission => {
                    !permissions.includes(permission.value) && permissions.push(permission.value)
                })
            })
        }
        // console.log(permissions);
        if(!permissions.includes(value)){
            return next(new Error('Ban khong co quyen truy cap trang nay'))
        }

        //Hàm kiểm tra 1 quyền bất kì

        req.user.can = (name) => {
            return permissions.includes(name)
        }
        
        next();
    }
}