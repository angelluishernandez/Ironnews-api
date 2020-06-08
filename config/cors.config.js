const cors = require("cors");
console.log(process.env.REACT_APP_API_URL);

const corsMiddleware = cors({
	origin: process.env.REACT_APP_API_URL,
	allowedHeaders: ["Content-Type", "Origin"],
	credentials: true,
});

module.exports = corsMiddleware;
