const {User} = require('../../../models/index')
const {Op} = require('sequelize')
module.exports = {
    index: async (req,res) => {
        const response = {};
        try{
            const {order = 'asc',sort='id',status,q} = req.query; 
            const filter = {};
            if(status === 'true' || status === 'false'){
                filter.status = status === 'true';
            }
            if(q){
                filter[Op.or] = {
                    fullname: {
                        [Op.iLike]:`%${q}%`
                    },
                    email: {
                        [Op.iLike]:`%${q}%`
                    },
                }
            }
            const {count, rows: users} = await User.findAndCountAll({
                attributes: {
                    exclude: ['password','provider_id']
                },
                order: [[sort,order]],
                where:filter
            });
            Object.assign(response, {
                status: 200,
                message: 'Success',
                data: users,
                count: count,
            })
        } catch (e){
            Object.assign(response, {
                status: 500,
                message: 'Server Error',
            })
        }
        res.status(response.status).json(response);
    }
}