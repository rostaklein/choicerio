var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: { type: String, unique: true },
  password: String,
  facebook: {
    id: String,
    token: String
  }
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');