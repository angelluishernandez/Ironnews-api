const News = require("../models/news.model");
const Users = require("../models/user.model");
const Folders = require("../models/folder.model");
const createError = require("http-errors");

module.exports.listNews = (req, res, next) => {
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
		isInFolder,
		tags,
		readed,
		notes,
	};
	News.findOneAndUpdate(req.params.id, newsModel, { new: true })
		.then(news => {
			console.log(news);
			res.status(200).json(news);
		})
		.catch(error => next(error));
};

module.exports.addNewsToFolder = (req, res, next) => {
	const folder = req.body.name;
	News.findById(req.params.newsId)
		.then(news => {
			Users.findOneAndUpdate({ folders: folder }, { $push: { news: news } })
				.then(folder => res.status(200).json(folder))
				.catch(error => console.log(error));
		})
		.catch(error => console.log(error));
};

module.exports.deleteNews = (req, res, next) => {
	News.deleteOne(req.params.newsId)
		.then(res => res.status(202))
		.catch(error => {
			console.log(error);
			res.json("This news has been deleted");
		});
};
