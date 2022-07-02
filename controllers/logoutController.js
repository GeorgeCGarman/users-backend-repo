const User = require('../model/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogout = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204)
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt
  const foundUser = await User.findOne({refreshToken: refreshToken}).exec()
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true})
    return res.sendStatus(204)
  } 
  await User.updateOne({_id: foundUser.id}, {refreshToken: ''})
  res.clearCookie('jwt', {httpOnly: true})
  res.sendStatus(204)
} 

module.exports = {handleLogout}