const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const passport = require('../config/passport')

router.post('/', authController.handleLogin) // get?
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}, 
  (req, res) => { 
    console.log(req)
    console.log(res)
    // res.redirect('/users')
  } 
))

module.exports = router