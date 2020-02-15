const mongoose = require("mongoose");
require("./user.model");
require("./news.model");
const folderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},

	description: {
		type: String,
		required: true,
	},
	// Add tags model?
	tags: {
		type: String,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	news: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "News",
	},
});

const Folders = mongoose.model("Folders", folderSchema);

module.exports = Folders;
