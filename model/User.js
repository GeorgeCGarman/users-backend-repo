const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  role: String,
  refreshToken: String,
  googleId: String
})

module.exports = mongoose.model('User', userSchema)