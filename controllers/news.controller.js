const News = require("../models/news.model");
const Users = require("../models/user.model");
const Folders = require("../models/folder.model");
const createError = require("http-errors");

module.exports.listNews = (req, res, next) => {
	News.find({ user: req.params.id })
		.populate("user")
		.then(response => res.json(response))
		.catch(error => console.log(error));
};

module.exports.addNews = (req, res, next) => {
	const news = new News({
		source_name: req.body.source_name,
		headline: req.body.headline,
		url: req.body.url,
		image: req.body.image,
		date: req.body.date,
		isInFolder: "checked" ? true : false,
		tags: req.body.tags,
		readed: "readed" ? true : false,
		notes: req.body.notes,
		user: req.params.id,
	});
	console.log(news);
	news
		.save()
		.then(news => {
			console.log(news);
			Users.findByIdAndUpdate(
				req.params.id,
				{ $push: { saved_news: news } },
				{ upsert: true },
				function(error, updatedUser) {
					console.log(updatedUser);
					news
						.save()
						.then(news => res.status(200).json(news))
						.catch(error => console.log(error));
				}
			);
		})
		.catch(error => console.log(error));
};

module.exports.newsDetails = (req, res, next) => {
	const news = req.params.newsId;

	News.findById(news)
		.populate("folder")
		.populate("user")
		.then(news => res.json(news))
		.catch(error => console.log(error));
};

module.exports.editNews = (req, res, next) => {
	const {
		source_name,
		headline,
		url,
		image,
		date,
		isInFolder,
		tags,
		readed,
		notes,
	} = req.body;
	newsModel = {
		source_name,
		headline,
		url,
		image,
		date,
		isInFolder: "checked" ? true : false,
		tags,
		readed: "readed" ? true : false,
		notes,
	};
	News.findOneAndUpdate(req.params.newsId, newsModel, { new: true })
		.then(news => {
			console.log(news);
			res.status(200).json(news);
		})
		.catch(error => next(error));
};

module.exports.addNewsToFolder = (req, res, next) => {
	const folder = req.body.name;
	console.log(folder);
	Folders.findOneAndUpdate(
		{ name: folder },
		{ news: req.params.newsId },
		{ upsert: true }
	)
		.then(folder => {
			console.log("this is the folder=> ", folder)
			folder.populate("news");
			res.json(folder);
		})
		.catch(error => console.log(error));
};

module.exports.deleteNews = (req, res, next) => {
	News.findByIdAndRemove(req.params.newsId)
		.then(console.log("This news has been deleted"))
		.catch(error => {
			console.log(error);
			throw createError("This news hasn't been deleted");
		});
};
