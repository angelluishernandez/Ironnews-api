const News = require("../models/news.model");
const User = require("../models/user.model");
const Folder = require("../models/folder.model");
const createError = require("http-errors");

module.exports.listFolders = (req, res, next) => {
	const user = req.params.id;
	Folder.find({ user: req.params.id })
		.then(folders => {
			console.log(folders);
			res.status(200).json(folders);
		})
		.catch(error => console.log(error));
};

module.exports.addFolder = (req, res, next) => {
	const folder = new Folder({
		name: req.body.name,
		description: req.body.description,
		tags: req.body.tags,
		user: req.params.id,
		news: req.body.news,
	});


	folder
		.save()
		.then(folder => {
			User.findByIdAndUpdate(
				req.params.id,
				{ $set: { folders: folder.id } },

				function(error, updatedDocument) {
					res.json(folder);
					folder.save();
				}
			);
		})
		.catch(error => console.log(error));
};

module.exports.folderDetails = (req, res, next) => {
	Folder.findById(req.params.folderId)
		.populate("user")
		.populate("news")
		.then(response => res.json(response))
		.catch(error => console.log(error));
};

module.exports.updateFolder = (req, res, next) => {
	const folderId = req.params.folderId;

	console.log(req.body);
	Folder.findOneAndUpdate(folderId, req.body, { new: false })

		.then(folder => res.json(folder))
		.catch(error => console.log(error));
};

module.exports.deleteFolder = (req, res, next) => {
	console.log("this is req.params=>", req.params)
	Folder.deleteOne({_id: req.params.folderId})
		.then(response => {
			console.log(response);
			response.send("The folder was deleted succesfully");
		})
		.catch(error => console.log(error));
};
