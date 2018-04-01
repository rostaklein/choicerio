var mongoose = require('mongoose');  
var FormSchema = new mongoose.Schema({  
  name: String,
  description: String,
  url: {type: String, unique: true},
  createdAt: {type: Date, default: Date.now},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
mongoose.model('Form', FormSchema);

module.exports = mongoose.model('Form');