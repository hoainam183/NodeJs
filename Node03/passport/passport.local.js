const {User} = require('../models/index')
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await User.findOne({
        where:{email:email},
    })
    if(!user){
        return done(null, false, {
            message: 'Tai khoan khong ton tai'
        })
    }
    if(!bcrypt.compare(password, user.password)) {
        return done(null, false, {
            message: 'Mat khau khong chinh xac'
        })
    }
    return done(null,user);
  }
);
