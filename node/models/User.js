var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  image: String,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema);
