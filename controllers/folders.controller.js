const News = require("../models/news.model");
const User = require("../models/user.model");
const Folder = require("../models/folder.model");
const createError = require("http-errors");

module.exports.listFolders = (req, res, next) => {
	const user = req.params.id;

	Folder.find({user: user})
		.populate("folders")
		.then(folders => {
			res.json(folders);
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
				{ $push: { folders: folder } },
				{ upsert: true },
				function(error, updatedDocument) {
					folder
						.save()
						.then(folder => res.json(folder))
						.catch(error => console.log(error));
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
	Folder.deleteOne({"_id": req.params.folderId})
		.then(response => {
			console.log("this is the res =>", response)
			res.send("The folder was deleted succesfully")})
		.catch(error => console.log(error));
};
