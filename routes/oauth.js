const express = require('express')
const router = express.Router()
passport = require('../config/passport')
const oauthController = require('../controllers/oauthController')

router.get('/', passport.authenticate('google', { scope: ['profile'] }))
router.get('/callback', passport.authenticate('google', {failureRedirect: '/auth'}, 
  (req, res) => { 
    // res.redirect('/users')
  } 
))

module.exports = router