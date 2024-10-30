const {Role, Permission, User} = require('../models/index')
const permission = require('../utils/permission')
const {isPermission} = require('../utils/permission')
module.exports = {
    index: async (req,res) => {
        const roles = await Role.findAll({
            order:[['id','desc']],
        })
        res.render('roles/index', {roles})
    },
    add: async (req,res) => {
        res.render('roles/add')
    },
    handleAdd: async (req,res) => {
        let {name, permissions} = req.body;
        if(!name){
            req.flash('msg','Vui long nhap ten vai tro');
            return res.redirect('/roles/add');
        }
        if(!permissions) {
            permissions=[];
        }
        permissions = Array.isArray(permissions) ? permissions : [permissions];
        const role = await Role.create({name});

        if(permissions.length){
            const permissionInstances = await Promise.all(permissions.map(async (value) => {
                const [permissionInstance] = await Permission.findOrCreate({
                    where:{value: value.trim()},
                    defaults:{value: value.trim()},
                });
                return permissionInstance;
            }))
            // console.log(permissionInstances)
            // res.json({permissionInstances});
            // Thêm role và permission vào bảng: roles_permissions

            await role.addPermissions(permissionInstances);
        }
        return res.redirect('/roles')
    },
    edit: async (req,res) => {
        // console.log(req.params);
        const id = req.params.id;
        const role = await Role.findByPk(id, {
            include:{
                model: Permission,
                as: 'permissions'
            }
        })
        res.render('roles/edit',{role, isPermission})
    },
    handleEdit: async (req,res) => {
        const {id} = req.params;
        let {name, permissions} = req.body;
        if(!name){
            req.flash('msg','Vui long nhap ten vai tro');
            return res.redirect('/roles/add');
        }
        if(!permissions) {
            permissions=[];
        }
        permissions = Array.isArray(permissions) ? permissions : [permissions];
        await Role.update({name}, {where: {id}});
        const role = await Role.findByPk(id);
        if(role && permissions.length){
            const permissionInstances = await Promise.all(permissions.map(async (value) => {
                const [permissionInstance] = await Permission.findOrCreate({
                    where:{value: value.trim()},
                    defaults:{value: value.trim()},
                });
                return permissionInstance;
            }))
            // console.log(permissionInstances)
            // res.json({permissionInstances});
            // Thêm role và permission vào bảng: roles_permissions

            await role.setPermissions(permissionInstances);
        }
        return res.redirect('/roles/edit/' + id)
    },
    delete: async (req,res) => {
        const {id} = req.params;
        const role = await Role.findByPk(id, {
            include: [
                {
                    model: Permission,
                    as: 'permissions'
                },
                {
                    model: User,
                    as: 'users'
                }
            ]
        });
        await role.removePermissions(role.permissions);
        await role.removeUsers(role.users);
        await role.destroy();
        return res.redirect('/roles')
        res.json({permissions: role.permissions})
    }
}