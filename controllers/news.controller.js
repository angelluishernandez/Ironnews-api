const News = require("../models/news.model");
const Users = require("../models/user.model");
const Folders = require("../models/folder.model");
const createError = require("http-errors");

module.exports.listNews = (req, res, next) => {
	console.log(req.params.id);
	Users.findById(req.params.id)
		.populate("folders")
		.populate("news")
		.then(user => res.json(user.folders))
		.catch(error => console.info(error));
};

module.exports.listFolders = (req, res, next) => {
	Folders.find()
		.populate("news")
		.then(folder => res.json(folder))
		.catch(error => console.info(error));
};
