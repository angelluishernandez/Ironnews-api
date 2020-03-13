const cors = require("cors");

const corsMiddleware = cors({
	origin: "http://localhost:3000",
	allowedHeaders: ["Content-Type", "Origin"],
	credentials: true,
});

module.exports = corsMiddleware;
