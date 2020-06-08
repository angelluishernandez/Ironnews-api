const cors = require("cors");

const corsMiddleware = cors({
	origin: process.env.REACT_APP_API_URL,
	allowedHeaders: ["Content-Type", "Origin"],
	credentials: true,
});

module.exports = corsMiddleware;
