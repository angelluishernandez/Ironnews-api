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
