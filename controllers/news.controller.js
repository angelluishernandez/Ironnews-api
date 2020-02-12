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

module.exports.addNews = (req, res, next) => {
	const news = new News({
		source_name: req.body.name,
		headline: req.body.headline,
		url: req.body.url,
		image: req.body.image,
		date: req.body.date,
		isInFolder: "checked" ? true : false,
		tags: req.body.tags,
		readed: "readed" ? true : false,
		notes: req.body.notes,
	});
	news
		.save()
		.then(news => {
			console.log(news);
			Folders.findByIdAndUpdate(
				req.params.id,
				{ $set: { saved_news: news } },
				{ upsert: true },
				function(error, updatedUser) {
					console.log(updatedUser)
					news
						.save()
						.then(news => res.status(200).json(news))
						.catch(error => console.log(error));
				}
			);
		})
		.catch(error => console.log(error));
};

module.exports.addNewsToFolder = (req, res, next) => {};
