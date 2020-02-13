const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const createError = require("http-errors");

module.exports.getTopHeadlines = (req, res, next) => {
  const {query, qInTitle, lenguage, source, from, to, sortBy } = req.body
  console.log(req.body)
	newsapi.v2
		.topHeadlines({
      q: query,
      qInTitle: qInTitle ? qInTitle : "", 
      language: lenguage ? lenguage : "",
      source: source ? source : "", 
      from: from ? from : "", 
      to: to ? from : "", 
      sortBy: sortBy ? sortBy : ""
			
		})
		.then(articles => {
			res.status(200).json(articles);
	
		})
		.catch(error => console.log(error));
};


module.exports.everything = (req, res, next) => {

const {query, qInTitle, lenguage, source, from, to, sortBy } = req.body
newsapi.v2
		.everything({
      q: query,
      qInTitle: qInTitle ? qInTitle : "", 
      language: lenguage ? lenguage : "",
      source: source ? source : "", 
      from: from ? from : "", 
      to: to ? from : "", 
      sortBy: sortBy ? sortBy : ""
			
		})
		.then(articles => {
			res.status(200).json(articles);
	
		})
		.catch(error => console.log(error));



}

