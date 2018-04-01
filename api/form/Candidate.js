var mongoose = require('mongoose');  
var CandidateSchema = new mongoose.Schema({  
  title: String,
  description: String,
  order: Number,
  responseToken: String
});
mongoose.model('Candidate', CandidateSchema);

module.exports = mongoose.model('Candidate');