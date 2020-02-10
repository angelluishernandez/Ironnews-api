const mongoose = require("mongoose")
require("./user.model");
require("./news.model")
const folderSchema = mongoose.Schema({

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
  tag: {
    type: String, 
  }




})



const Folders = mongoose.model("Folders", folderSchema)

module.exports = Folders