const sql = require("../utils/db");
const userModel = require("../models/user.model");
const { string } = require("yup");

module.exports = {
  index: async (req, res, next) => {
    const status = req.query.status;
    const keyword = req.query.keyword;
    // console.log(status);
    const name = req.flash("msg")[0];
    let users;
    try {
      users = await userModel.all(status, keyword);
      // console.log(users);
    } catch (e) {
      return next(e);
    }
    res.render("users/index", { users, name });
  },
  add: (req, res) => {
    res.render("users/add", { req });
  },
  handleAdd: async (req, res) => {
    const body = await req.validate(req.body, {
      name: string().required("Ten bat buoc phai nhap"),
      email: string()
        .required("email bat buoc phai nhap")
        .email("email khong dung dinh dang")
        .test("checked-email", "Email da ton tai", async (value) => {
          const email = await userModel.email(value);
          return !email.length;
        }),
      status: string().test(
        "check-status",
        "Trang thai khong hop le",
        (value) => {
          value = +value;
          if (!isNaN(value) && (value === 0 || value === 1)) return true;
          return false;
        }
      ),
    });
    if (body) {
      await userModel.create(body.name, body.email, body.status);
      // console.log(newUser);
      req.flash("msg", `Hello ${body.name}`);

      return res.redirect("/users");
      // console.log(body);
    }
    return res.redirect("/users/add");
    // res.send("submit")
  },
  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      req.session.currentId = id;
      const user = await userModel.find(id);
      if (!user.length) {
        throw new Error("User khong ton tai");
      }
      req.old = user[0];
      const msg = req.flash("msg")[0];
      res.render("users/edit", { req, msg });
    } catch (e) {
      return next(e);
    }
  },
  handleEdit: async (req, res, next) => {
    const id = req.params.id;
    if(id !== req.session.currentId){
      return next(new Error("Back...."))
    }
    const body = await req.validate(req.body, {
      name: string().required("Ten bat buoc phai nhap"),
      email: string()
        .required("email bat buoc phai nhap")
        .email("email khong dung dinh dang")
        .test("checked-email", "Email da ton tai", async (value) => {
          const email = await userModel.email(value,id);
          return !email.length;
        }),
      status: string().test(
        "check-status",
        "Trang thai khong hop le",
        (value) => {
          value = +value;
          if (!isNaN(value) && (value === 0 || value === 1)) return true;
          return false;
        }
      ),
    });
    if(body) {
      await userModel.update(body.name, body.email, body.status, id);
      req.flash("msg","Cap nhat nguoi dung")
    }
    
    res.redirect(`/users/edit/${id}`);
  },
  delete: async (req,res,next) => {
    const {id} = req.params;
    console.log(id);
    
    try{
      await userModel.delete(id);
      return res.redirect('/users')
    } catch(e) {
      return next(e)
    }
  }
};
