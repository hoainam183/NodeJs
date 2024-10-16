import { object, string } from "yup";
import { getError } from "../untils/validate.js";

const authController = {
  //GET
  login: (req, res) => {
    // res.send("<h1>Dang nhap</h1>")
    const msg = req.flash("msg");
    const errors = req.flash("errors");
    console.log(errors);

    res.render("auth/login", {
      layout: "layouts/authLayout",
      errors,
      getError,
    });
  },

  //POST
  handleLogin: async (req, res) => {
    const errors = {};
    // let { email, password } = req.body;
    // if(!email.trim()){
    //     errors.email = "Email khong duoc de trong"
    // }
    // if(!password.trim()){
    //     errors.password = "Password khong duoc de trong"
    // }
    // req.flash("errors", errors);

    // Các bước khi làm việc với validate yup
    //1. Xác định rule
    const schema = object({
      email: string().email('Eamil khong dung dinh dang').required('Email bat buoc phai nhap'),
      password: string().required('Mat khau bat buoc phai nhap'),
    });

    //2. Xác định message
    //3. Kiểm tra (validate)
    try {
      const data = await schema.validate(req.body, {
        abortEarly: false,
      });
      console.log(data);
    } catch(e) {
        // console.log(e.inner[0].errors);
        const arrErrors = {};
        e.inner.forEach(({path, errors}) => {
          arrErrors[path] = errors[0];
        })
        console.log(arrErrors);
        req.flash('errors',arrErrors)
    }
    return res.redirect("/dang-nhap");
  },
};
export default authController;
