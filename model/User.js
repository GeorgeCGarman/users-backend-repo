const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  role: String,
  refreshToken: String,
  googleId: String
})

userSchema.plugin(findOrCreate)
module.exports = mongoose.model('User', userSchema)