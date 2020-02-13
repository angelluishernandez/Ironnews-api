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
	const currentUser = req.session.user.id;
	if (currentUser === req.params.id) {
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
	} else {
		throw createError(400, "You are not allowed here! :( ");
	}
};

module.exports.folderDetail = (req, res, next) => {
	const currentUser = req.session.user.id;
	if (currentUser === req.params.id) {
	
	const folder = req.params.folderId;

	Folder.findById(folder)
		.populate("user")
		.then(response => res.json(response))
		.catch(error => console.log(error))
	}else {
		
	}

};

module.exports.updateFolder = (req, res, next) => {
	const folderId = req.params.folderId;

	console.log(req.body);
	Folder.findOneAndUpdate(folderId, req.body, { new: true })

		.then(folder => res.json(folder))
		.catch(error => console.log(error));
};

module.exports.deleteFolder = (req, res, next) => {
	Folder.deleteOne(req.params.folderId)
		.then(res => res.status(200).send("The folder was deleted succesfully"))
		.catch(error => console.log(error));
};
