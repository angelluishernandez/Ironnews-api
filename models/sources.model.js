const mongoose = require("mongoose");

require("./user.model");

const sourcesSchema = new mongoose.Schema({
	name: String,
	category: String,
	country: String,
	language: String,
	url: String,
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Sources = mongoose.model("Sources", sourcesSchema);

module.exports = Sources;
