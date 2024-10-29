const {Role, Permission} = require('../models/index')
module.exports = {
    index: (req,res) => {
        res.render('roles/index')
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
        // const role = await Role.create({name});

        if(permissions.length){
            const permissionInstances = await Promise.all(permissions.map(async (value) => {
                const [permissionInstance] = await Permission.findOrCreate({
                    where:{value: value.trim()},
                    defaults:{value: value.trim()},
                });
                return permissionInstance;
            }))
            console.log(permissionInstances)
        }
        res.json({permissionInstances});
    }
}