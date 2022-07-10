const passport = require('passport')
const User = require('../model/User')
const bcrypt = require('bcrypt')
require('dotenv').config()
var GoogleStrategy = require('passport-google-oauth20').Strategy
var LocalStrategy = require('passport-local').Strategy

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback" // change
    // userProfileURL: ""
  },
  async (accessToken, refreshToken, profile, cb) => {
    // console.log(profile)
    const newUser = {
      googleId: profile.id,
      username: profile.name.givenName, // change?
    }
    try {
      const user = await User.findOne({googleId: profile.id})
      if (user) {
        cb(null, user)
      } else {
        user = await User.create(newUser)
        cb(null, user)
      }
    } catch (err) {
      console.log(err)
    }
  }
))

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username: username}, async function (err, user) {
      if (err) return done(err)
      if (!user) return done(null, false)
      const match = await bcrypt.compare(password, user.password)
      if (!match) return done(null, false)
      return done(null, user)
    })
  }
))

module.exports = passport