const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.getTopHeadlines = (req, res, next) => {
	const { query, qInTitle, lenguage, source, from, to, sortBy } = req.body;
	console.log(req.body);
	newsapi.v2
		.topHeadlines({
			q: query,
			qInTitle: qInTitle ? qInTitle : "",
			language: lenguage ? lenguage : "",
			source: source ? source : "",
			from: from ? from : "",
			to: to ? from : "",
			sortBy: sortBy ? sortBy : "",
		})
		.then(articles => {
			res.status(200).json(articles);
		})
		.catch(error => console.log(error));
};

module.exports.everything = (req, res, next) => {
	const { query, qInTitle, lenguage, source, from, to, sortBy } = req.body;
	newsapi.v2
		.everything({
			q: query,
			qInTitle: qInTitle ? qInTitle : "",
			language: lenguage ? lenguage : "",
			source: source ? source : "",
			from: from ? from : "",
			to: to ? from : "",
			sortBy: sortBy ? sortBy : "",
		})
		.then(articles => {
			res.status(200).json(articles);
		})
		.catch(error => console.log(error));
};

module.exports.getCustomCategoriesNews = (req, res, next) => {
   const user = req.params.id;
	User.findById(user).then(user => 
		user.customCategories.forEach(category => {
			newsapi.v2
				.topHeadlines({
					q: category,
				})
				.then(res => res.status(200).json(res))
				.catch(error => console.log(error));
		})
	).catch(error => console.log(error))
};
