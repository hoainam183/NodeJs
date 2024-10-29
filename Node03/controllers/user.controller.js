const { Op } = require("sequelize");
const model = require("../models/index");
const User = model.User;
const Phone = model.Phone;
const Course = model.Course;

module.exports = {
  index: async (req, res) => {
    // const users = await User.findAll({
    //   // attributes:['id','name','email']
    //   // where: {
    //   //     id: 4,
    //   // }

    //   order: [
    //     ["id", "desc"],
    //     ["name", "asc"],
    //   ],
    //   // where: {
    //   //   [Op.or]: {
    //   //       status:false,
    //   //       id: {
    //   //         [Op.gte]: 3,
    //   //       },
    //   //   }
    //   // }

    //   where: {
    //     status:true,
    //     [Op.or]: {
    //       name:{
    //         [Op.iLike]: 'user3',
    //       },
    //       email:{
    //         [Op.iLike]:'user3'
    //       }
    //     }
    //   }
    // });

    // const user = await User.findOne({
    //     where:{id: 4},
    // })
    // console.log(user);

    // const users = await User.findAndCountAll();

    // console.log(req.query.status);

    const status = req.query.status;
    const keyword = req.query.keyword;
    const filters = {};

    if (status === "active" || status === "inactive") {
      filters.status = status === "active";
    }

    if (keyword) {
      filters[Op.or] = {
        fullname: {
          [Op.iLike]: `%${keyword}%`,
        },
        email: {
          [Op.iLike]: `%${keyword}%`,
        },
      };
    }
    const users = await User.findAll({
      order: [
        ["id", "desc"],
        ["fullname", "asc"],
      ],
      where: filters,
      // include: {
      //   model: Phone,
      //   as: "phone",
      // },
    });

    // for (let user of users){
    //   const phoneInstance = await user.getPhone();
    //   user.phone = phoneInstance?.phone;
    // }

    res.render("users/index", { users });
  },

  add: async (req, res) => {
    const courses = await Course.findAll({
      order: [["fullname", "asc"]],
    });
    res.render("users/add", { courses });
  },

  handleAdd: async (req, res) => {
    const body = req.body;

    const user = await User.create({
      name: body.name,
      email: body.email,
      status: body.status == 1 ? true : false,
    });
    if (user) {
      const courses = Array.isArray(body.courses)
        ? body.courses
        : [body.courses];
      // return res.json(courses)

      if (courses.length) {
        const coursesIntance = await Promise.all(
          courses.map((courseId) => Course.findByPk(courseId))
        );
        await user.addCourses(coursesIntance);
      }
    }
    return res.redirect("/users");
  },

  edit: async (req, res, next) => {
    const { id } = req.params;
    try {
      const courses = await Course.findAll({
        order: [["fullname", "asc"]],
      });

      const user = await User.findOne({
        where: {
          id: id,
        },
        include: {
          model: Course,
          as: "courses",
        },
      });

      if (!user) {
        throw new Error("Khong tim thay user");
      }
      res.render("users/edit", { user, courses });
    } catch (e) {
      next(e);
    }
  },

  handleEdit: async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    const status = await User.update(
      {
        name: body.name,
        email: body.email,
        status: body.status == 1 ? true : false,
      },
      {
        where: { id },
      }
    );

    if (status) {
      const courses = Array.isArray(body.courses)
        ? body.courses
        : [body.courses];
      // return res.json(courses)

      if (courses.length) {
        const coursesIntance = await Promise.all(
          courses.map((courseId) => Course.findByPk(courseId))
        );
        const user=await User.findByPk(id);
        await user.setCourses(coursesIntance);
      }
    }
    return res.redirect("/users/edit/" + id);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const status = await User.destroy({
      where: {
        id,
        // force: true, // Xóa vĩnh viễn
      },
    });
    res.redirect("/users");
  },
};
