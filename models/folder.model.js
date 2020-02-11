const mongoose = require("mongoose")
require("./user.model");
require("./news.model")
const folderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"

  }, 
  news: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "News" 
  },
  description: {
    type: String, 
    required: true
  }, 
  // Add tags model?
  tag: {
    type: String, 
  }




})



const Folders = mongoose.model("Folders", folderSchema)

module.exports = Folders