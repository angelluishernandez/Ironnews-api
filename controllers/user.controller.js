const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		profilePic: req.file ? req.file.url : undefined,
		organization: req.body.organization,
		collaborators: req.body.collaborators,
		interests: req.body.interests,
		filters: req.body.filters,
		folders: req.body.folders,
		saved_news: req.body.saved_news,
	});
	user
		.save()
		.then(user => res.status(202).json(user))
		.catch(next);
};

module.exports.doLogin = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw createError(400, "missing credentials");
	}

	User.findOne({ email: email })
		.then(user => {
			if (!user) {
				throw createError(404, "user not found");
			} else {
				return user.checkPassword(password).then(match => {
					if (!match) {
						throw createError(400, "invalid password");
					} else {
						req.session.user = user;
						res.json(user);
					}
				});
			}
		})
		.catch(next);
};

module.exports.logout = (req, res, next) => {
	req.session.destroy();
	res.clearCookie("connect.sid")
	if (!req.session) {
		console.log("Logged out");
	}
};

module.exports.showDetails = (req, res, next) => {
	User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(error => console.log(error));
};

module.exports.editUser = (req, res, next) => {
	console.log(req.body.name)

	User.findByIdAndUpdate(req.params.id, req.body)
		.then(user => {
			console.log(user);
			user.save()
			res.json(user);
		})
		.catch(error => next(error));
};
