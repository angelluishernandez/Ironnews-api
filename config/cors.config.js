const cors = require('cors')

const corsMiddleware = cors({
	origin: "https://ironnewsapp.herokuapp.com",
	allowedHeaders: ['Content-Type', 'Origin'], 
	credentials: true
})

module.exports = corsMiddleware