const User = require('../model/User')
require('dotenv').config()
passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy
var JwtStrategy = require('passport-jwt').Strategy
    ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
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

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'
opts.issuer = 'accounts.examplesoft.com'
opts.audience = 'yoursite.net'
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false)
        }
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
            // or you could create a new account
        }
    })
}))

module.exports = passport