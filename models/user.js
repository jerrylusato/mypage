const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  'name': String,
  'avatar': String,
  'email': String,
  'password': String,
  'views': Number,
  'links': [{
    'title': String,
    'image': String,
    'url': String,
    'views': Number,
    'clicks': Number
  }]
})

module.exports = mongoose.model("User", userSchema)