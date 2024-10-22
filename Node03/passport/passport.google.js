const GoogleStrategy = require("passport-google-oauth2").Strategy;

module.exports = new GoogleStrategy(
  {
    clientID: '234703531453-ie10ctrr6n98qjrgitg5ohsc9935ge27.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ['profile', 'email']
  },
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null,profile)
  }
);
