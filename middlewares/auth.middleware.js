module.exports.isAuthenticated = (req, res, next) => {
	if (req.session.user) {
		next();
	} else {
		req.session.genericError = "User is not authenticated";
		res.redirect("/login");
	}
};

module.exports.isNotAuthenticated = (req, res, next) => {
	if (req.session.user) {
		res.redirect("/");
	} else {
		next();
	}
};

module.exports.isCurrentUser = (req, res, next) => {
	console.log(req.params.id)
	if (req.session.user._id === req.params.id) {
		next();
	} else {
		req.session.genericError = "You are not allowed in here";
	}
};
