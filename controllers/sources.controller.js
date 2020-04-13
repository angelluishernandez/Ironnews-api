const User = require("../models/user.model");
const Sources = require("../models/sources.model");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

// List Sources

module.exports.getSources = (req, res, next) => {

	newsapi.v2
		.sources({
			category: req.body.category,
			language: req.body.language,
		})
		.then((response) => {
			res.status(200).json(response.sources);
		})
		.catch((error) => console.log(error));
};

module.exports.addSourcesToUser = (req, res, next) => {

	req.body.forEach((source) => {
		const { name, category, country, language, url, id } = source;
		console.log(source);
		const sourceData = new Sources({
			name,
			category,
			country,
			language,
			url,
			idFromAPI: id,
			user: req.params.userId,
		});
		sourceData.save().then((source) =>
			User.findByIdAndUpdate(
				req.params.id,
				{ $push: { sources: source } },
				{ upsert: true },
				(error, updatedDocument) => {
					source
						.save()
						.then((source) => res.json(source))
						.catch((error) => console.log(error));
				}
			)
		);
	});
};

module.exports.listUserSources = (req, res, next) => {
	Sources.find({ user: req.params.userId })
		.then((sources) => res.json(sources))
		.catch((error) => console.log(error));
};

module.exports.getSourceNews = (req, res, next) => {
	console.log("================", req.body);
	newsapi.v2
		.everything({
			// q: "",
			// language: "es",
			sources: req.body.sourceId,
		})
		.then((news) => {
			console.log(news);
			res.status(200).json(news.articles);
		})
		.catch((error) => console.log(error));
};
