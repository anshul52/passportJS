var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mydbdatabase');

var userSchema = mongoose.Schema({
  name:String,
  username:String,
  password:String,
  age:Number,
})

userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);