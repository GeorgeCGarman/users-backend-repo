const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({'message': 'Username and password are required'})
  const foundUser = await User.findOne({username}).exec()
  if (!foundUser) return res.sendStatus(401)
  const match = await bcrypt.compare(password, foundUser.password)
  if (match) {
    res.json({'success': `User ${foundUser.username} is logged in`})
  } else {
    res.sendStatus(401)
  }
} 

module.exports = {handleLogin}