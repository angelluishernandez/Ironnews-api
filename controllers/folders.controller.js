const News = require("../models/news.model");
const User = require("../models/user.model");
const Folder = require("../models/folder.model");
const createError = require("http-errors");

module.exports.listFolders = (req, res, next) => {
	const user = req.params.id;

	User.findById(user)
		.populate("folders")
		.then(user => res.json(user.folders))
		.catch(error => console.log(error));
};

module.exports.addFolder = (req, res, next) => {
	const folder = new Folder({
		user: req.params.id,
		description: req.body.description,
		tags: req.body.tags,
	});
	console.log(req.body);
	folder
		.save()
		.then(folder => {
			console.log(folder);
			User.findByIdAndUpdate(
				{ _id: req.params.id },
				{ $set: { folders: folder.id } },
				{ upsert: true },  function (error, updatedDocument) {
					folder
					.save()
					.then(folder => res.json(folder))
					.catch(error => console.log(error))

				} 
			)
			
		})
		.catch(error => console.log(error));
};
