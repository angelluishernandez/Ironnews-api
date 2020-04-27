const News = require("../models/news.model");
const Users = require("../models/user.model");
const Folders = require("../models/folder.model");
const createError = require("http-errors");

module.exports.listNews = (req, res, next) => {
	console.log("entra", req.params.folderId);

	const folder = req.params.folderId;
	News.find({ folder: folder })
		.then((response) => {
			console.log(response);
			res.json(response);
		})
		.catch((error) => console.log(error));
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
		.then((news) => {
			console.log(news);
			Users.findByIdAndUpdate(
				req.params.id,
				{ $push: { saved_news: news } },
				{ upsert: true },
				function (error, updatedUser) {
					console.log(updatedUser);
					news
						.save()
						.then((news) => res.status(200).json(news))
						.catch((error) => console.log(error));
				}
			);
		})
		.catch((error) => console.log(error));
};

module.exports.newsDetails = (req, res, next) => {
	const news = req.params.newsId;

	News.findById(news)
		.populate("folder")
		.populate("user")
		.then((news) => res.json(news))
		.catch((error) => console.log(error));
};

module.exports.editNews = (req, res, next) => {
	const {
		source,
		title,
		url,
		urlToImage,
		publishedAt,
		isInFolder,
		tags,
		readed,
		notes,
	} = req.body;
	newsModel = {
		source,
		title,
		url,
		urlToImage,
		publishedAt,
		isInFolder: "checked" ? true : false,
		tags,
		readed: "readed" ? true : false,
		notes,
	};
	News.findOneAndUpdate(req.params.newsId, newsModel, { new: true })
		.then((news) => {
			res.status(200).json(news);
		})
		.catch((error) => next(error));
};

module.exports.listNewsAll = (req, res, next) => {
	const folder = req.params.folderId;

	News.find({ folder: folder })
		.then((news) => res.json(news))
		.catch((error) => console.log(error));
};

module.exports.addNewsToFolder = (req, res, next) => {
	const {
		content,
		description,
		publishedAt,
		title,
		folder,
		url,
		urlToImage,
	} = req.body;

	const news = new News({
		content: req.body[0].content,
		description: req.body[0].description,
		publishedAt: req.body[0].publishedAt,
		source: req.body[0].source,
		title: req.body[0].title,
		url: req.body[0].url,
		urlToImage: req.body[0].urlToImage,
		folder: req.params.folderId,
	});
	console.log("=====================================================");
	console.log(news);
	console.log("=====================================================");

	news
		.save()
		.then((news) => {
			Folders.findByIdAndUpdate(
				folder,
				{ $push: { news: news } },
				{ new: true },
				function (error, updatedDocument) {
					news.save().then((news) => res.json(news));
				}
			);
		})
		.catch((error) => console.log(error));
};

module.exports.deleteNews = (req, res, next) => {
	console.log(req.params);
	News.findByIdAndRemove(req.params.newsId)
		.then((news) => res.status(202).json(news))
		.catch((error) => {
			console.log(error);
			throw createError("This news hasn't been deleted");
		});
};
