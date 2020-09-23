const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role : {
    type : String,
    required : true,
    min : 6,
    max : 255
  },
  createdAt : {
    type : Date,
    default : Date.now
  },
  lastModification : {
    type : Date,
    default : Date.now
  },
});

module.exports = mongoose.model('Role' , roleSchema)
