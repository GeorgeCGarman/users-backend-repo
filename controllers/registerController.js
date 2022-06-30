const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
  const {username, password} = req.body
  if (!username || !password) return res.status(400).json({'message': 'Username and password required'})
  const duplicate = await User.findOne({username: username})
  if (duplicate) return res.status(409).json({'message': 'Conflict'})
  try {
    const hashedPwd = await bcrypt.hash(password, 10)
    const newUser = { 
      username: username,
      password: hashedPwd,
      role: 'user'
    }
    const result = await User.create(newUser)
    res.status(201).json({'success': `New user ${newUser.username} created!`})
    console.log(result);
  } catch (err) {
    res.status(500).json({'message': err.message})
  }
}

module.exports = { handleNewUser }