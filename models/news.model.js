const mongoose = require("mongoose");
require("./user.model");
const newsSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	folder: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Folders",
  },
  source_name:{
    type:String, 
    required: true
  }, 
  headline: {
    type: String, 
    required: true, 
  }, 
  url: {
    type: String, 
    required: true
  }, 
  image: String, 
  date: {
    type: String, 
    required: true, 

  }, 
  isInFolder: {
    type: Boolean, 
    default: false 
  }, 
  tags: {
    type: String
  }, 
  readed: {
    type: Boolean, 
    required: true
  }, 
  notes: {
    type: String,
    default: ""

  }
});


const News = mongoose.model("News", newsSchema)

module.exports = News