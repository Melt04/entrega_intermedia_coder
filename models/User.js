const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String
})

userModel = mongoose.model('User', userSchema)
module.exports = userModel
