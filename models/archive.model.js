const mongoose = require("mongoose")

const archiveSchema = new mongoose.Schema({
  user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	folder_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Folders",
  },
  source_name:{
    type:String, 
    required: true
  }, 
  title: {
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
  tag: {
    type: String
  }, 
  readed: {
    type: Boolean, 
    required: true
  }, 
  notes: {
    type: String, 

  }
});


const Archive = mongoose.model("Archive", archiveSchema)

module.exports = Archive