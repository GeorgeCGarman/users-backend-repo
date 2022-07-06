require('dotenv').config()
User = require('../model/User')
passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
    // userProfileURL: ""
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      if (!err) {
        console.log('success')
      }
      return cb(err, user)
    });
  }
))

module.exports = passport