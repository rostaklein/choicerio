var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: {type: Date, default: Date.now},
  facebook: {
    id: String,
    token: String
  }
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');