// request
// validate
// error
// flash
const { object } = require("yup");

module.exports = (req, res, next) => {
  // ĐỊnh nghĩa hàm validate để sử dụng bên controller
  req.validate = async (data, rule = {}) => {
    const schema = object(rule);
    try {        
      const body = await schema.validate(data, {
        abortEarly: false,
      });
    //   return res.redirect('/users');
      return body;
    } catch (e) {
    //   console.log(e.inner);
      const errors = Object.fromEntries(
        e.inner.map((item) => [item.path, item.message])
      );

      req.flash("errors", errors);
      req.flash("old", data);
    }
  };
  // Lưu lỗi nếu validate falied vào req để hiển thị ở view
  const errors = req.flash("errors");
  // console.log(errors);
  req.errors = errors.length ? errors[0] : {};
  const old = req.flash("old");
  // console.log(errors);
  req.old = old.length ? old[0] : {};
  // const old
  next();
};