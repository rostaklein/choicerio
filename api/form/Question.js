var mongoose = require('mongoose');  
var QuestionSchema = new mongoose.Schema({  
  title: String,
  description: String,
  order: Number
});
mongoose.model('Question', QuestionSchema);

module.exports = mongoose.model('Question');