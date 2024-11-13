const { User } = require("../../../models/index");
const { Op } = require("sequelize");
const { object, string } = require("yup");
const bcrypt = require('bcrypt')
module.exports = {
  index: async (req, res) => {
    const response = {};
    try {
      const {
        order = "asc",
        sort = "id",
        status,
        q,
        page = 1,
        limit,
      } = req.query;
      const filter = {};
      if (status === "true" || status === "false") {
        filter.status = status === "true";
      }
      if (q) {
        filter[Op.or] = {
          fullname: {
            [Op.iLike]: `%${q}%`,
          },
          email: {
            [Op.iLike]: `%${q}%`,
          },
        };
      }
      const options = {
        attributes: {
          exclude: ["password", "provider_id"],
        },
        order: [[sort, order]],
        where: filter,
      };
      if (Number.isInteger(+limit) && Number.isInteger(+page)) {
        const offset = (page - 1) * limit;
        options.limit = limit;
        options.offset = offset;
      }
      const { count, rows: users } = await User.findAndCountAll(options);
      Object.assign(response, {
        status: 200,
        message: "Success",
        data: users,
        count: count,
      });
    } catch (e) {
      Object.assign(response, {
        status: 500,
        message: "Server Error",
      });
    }
    res.status(response.status).json(response);
  },
  find: async (req, res) => {
    const { id } = req.params;
    const response = {};
    try {
      const user = await User.findByPk(id);
      if (!user) {
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
      }
      Object.assign(response, {
        status: 200,
        message: "Success",
        data: user,
      });
    } catch (e) {
      Object.assign(response, {
        status: e.status || 500,
        message: e.message || "Server Error",
      });
    }
    res.status(response.status).json(response);
  },
  store: async (req, res) => {
    const response = {};
    try {
      const schema = object({
        fullname: string().required("Ten bat buoc phai nhap"),
        email: string()
          .required("email bat buoc phai nhap")
          .email("email khong dung dinh dang")
          .test('check-unique','email da ton tai', async (value) => {
            const user = await User.findOne({where: {email:value}});
            return !user;
          }),
        password: string().required("mat khau bat buoc phai nhap"),
        status: string().test(
          "check-status",
          "Trang thai khong hop le",
          (value) => {
            return value === "true" || value === "false";
          }
        ),
      });
      const body = await schema.validate(req.body, { abortEarly: false });
      const user = await User.create({
        fullname: body.fullname,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        status: body.status,
        provider_id: body.provider_id
      })
      Object.assign(response, {
        status: 201,
        message: "Success",
        data: user,
      });
    } catch (e) {
        // const errors={};
      const errors = Object.fromEntries(
        e.inner.map(({ path, message }) => [path, message])
      );
      
      Object.assign(response, {
        status: 400,
        message: "Bad request",
        errors,
      });
    }
    
    res.json(response);
  },
};
