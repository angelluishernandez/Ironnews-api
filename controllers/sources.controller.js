const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

// List Sources

module.exports.getSources = (req, res, next) => {
	const { category, language, country } = req.body;

	newsapi.v2
		.sources({
			category,
			language,
			country: country,
		})
		.then(response => {
			res.status(200).json(response.sources);
		})
		.catch(error => console.log(error));
};
