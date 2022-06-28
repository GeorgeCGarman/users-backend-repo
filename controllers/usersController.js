const User = require('../model/User')

const getUser = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({'message': 'User ID required'})
  const user = await User.findOne({_id: req.params.id}).exec()
  if (!user) {
    return res.json({'message': `User id ${req.params.id} not found`})
  }
  res.json(user)
}

const getAllUsers = async (req, res) => {
  const users = await User.find()
  if (!users) return res.status(204).json({'message': 'No users found'})
  res.json(users)
}

const handleNewUser = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({'message': 'Username and password are required'})
  const duplicate = await User.findOne({username: username}).exec()
  if (duplicate) return res.sendStatus(409)

  try {
    const newUser = new User({
      username: username,
      password: password
    })
    newUser.save()
    
    res.status(201).json({'success': `New user ${newUser} created!`})
  } catch (err) {
    res.status(500).json({'message': err.message})
  }
}

const updateUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({'message': 'ID parameter is required'})
  }

  const user = await User.findOne({_id: req.body.id}).exec()
  if (!user) {
    return res.status(204).json({'message': `No users match id ${req.body.id}`})
  }

  if (req.body?.username) user.username = req.body.username
  if (req.body?.password) user.password = req.body.password

  const result = await user.save()
  res.json(result)
}

const deleteUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({'message': 'ID parameter is required'})
  }
  const result = await User.deleteOne({_id: req.body.id})
  res.json(result)
}

module.exports = { 
  getUser,
  getAllUsers,
  handleNewUser,
  updateUser,
  deleteUser
}