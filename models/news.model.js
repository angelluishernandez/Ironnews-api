const mongoose = require("mongoose");
require("./user.model");
const newsSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	folder: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Folders",
	},
	source: {
		type: { String },
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	urlToImage: String,
	publishedAt: {
		type: String,
		required: true,
	},
	isInFolder: {
		type: Boolean,
		default: false,
	},
	tags: {
		type: String,
	},
	readed: {
		type: Boolean,
		// required: true,
	},
	notes: {
		type: String,
		default: "",
	},
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
