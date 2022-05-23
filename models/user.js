const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  'name': String,
  'email': String,
  'password': String,
  'profile_pic': String,
  'views': Number,
  'links': [{
    'title': String,
    'link_pic': String,
    'url': String,
    'views': Number,
    'clicks': Number
  }]
})

module.exports = mongoose.model("User", userSchema)