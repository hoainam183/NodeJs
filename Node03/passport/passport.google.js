const GoogleStrategy = require("passport-google-oauth2").Strategy;
require('dotenv').config(); 

const {User, Provider} = require('../models/index') 

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
  },
  async function (accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    const {displayName: fullname, email} = profile;
    const [provider] = await Provider.findOrCreate({
      where: {name:'google'},
      defaults: {name:'google'}
    })
    if(!provider) {
      return cb(null, false, {
        message: 'Provider khong ton tai'
      })
    }
    console.log(provider);
    
    const [user] = await User.findOrCreate({
      where: {email},
      defaults: {
        fullname,
        email,
        status: true,
        provider_id: provider.id
      }
    })
    if(!user) {
      return cb(null, false, {
        message: 'Da co loi xay ra'
      })
    }
    cb(null,user)
  }
);
