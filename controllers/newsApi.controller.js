const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.landing = (req, res, next) => {
	const userCategories = req.session.user.customCategories;
	console.log(req.params.id);
	newsapi.v2
		.topHeadlines({
			category: req.body ? req.body : userCategories,
			country: "us",
			pageSize: 100,
		})
		.then(articles => res.status(200).json(articles))
		.catch(error => console.log(error));
};

module.exports.getTopHeadlines = (req, res, next) => {
	const { query, qInTitle, language, source, from, to, sortBy } = req.body;
	console.log("this is the req.body=>", req.body);
	newsapi.v2
		.everything({
			q: query,
			qInTitle: qInTitle,
			language: language ,
			sources: source,
			from: from ? from : "",
			to: to ? from : "",
			sortBy: sortBy ,
			pageSize: 100,
		})
		.then(articles => {
			res.status(200).json(articles);
		})
		.catch(error => console.log(createError(error)));
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
