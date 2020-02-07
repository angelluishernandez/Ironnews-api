const mongoose = require("mongoose");
const InterestsList = require("../constants/interests");

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			lowercase: true,
			match: [EMAIL_PATTERN, "Email is required"],
		},
		password: {
			type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"]
    },
    profilePic: {
      type: String, 
      

    },

		// Another model for organizations should be included later on

		organization: {
			type: String,
			required: true,
		},
		// Another model for organizations should be included later on

		collaborators: {
			type: String,
		},
		interests: {
			type: String,
			enum: InterestsList,
			default: null,
		},
		filters: [String],
		folders: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Folders",
		},
		saved_news: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News"
		},
	},
	{ timestamps: true }
);


const User = mongoose.model("User", userSchema)
module.exports = User
