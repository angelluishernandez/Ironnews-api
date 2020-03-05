const cors = require('cors')

const corsMiddleware = cors({
	origin: process.env.MONGODB_URI,
	allowedHeaders: ['Content-Type', 'Origin'], 
	credentials: true
})

module.exports = corsMiddleware