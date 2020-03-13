const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

// List Sources

module.exports.getSources = (req, res, next) => {
	console.log(req.body);
	const { category, language, country } = req.body;

	newsapi.v2
		.sources({
			category: category,
			language: language,
			country: country,
		})
		.then(sources => res.status(200).json(sources))
		.catch(error => console.log(error));
};
