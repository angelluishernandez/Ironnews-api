const User = require("../models/user.model");
const Sources = require("../models/sources.model");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

// List Sources

module.exports.getSources = (req, res, next) => {
console.log(req.body)
	console.log("==============================")



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
	console.log(req.params.userId)
	req.body.forEach((source) => {
		const { name, category, country, language, url } = source;

		const sourceData = new Sources({
			name,
			category,
			country,
			language,
			url,
			user: req.params.userId,
		});
		console.log("=======================", sourceData);
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
