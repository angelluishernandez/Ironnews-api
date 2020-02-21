const User = require("../models/user.model");
const createError = require("http-errors");

// LIST USERS

module.exports.getUsers = (req, res, next) => {
	User.find()
		.then(users => res.json(users))
		.catch(next);
};

//CREATE USER

module.exports.create = (req, res, next) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		profilePic: req.file ? req.file.url : undefined,
		organization: req.body.organization,
		collaborators: req.body.collaborators,
		categories: req.body.categories,
		customCategories: req.body.customCategories,
	});
	console.log("=====================================")
	user
		.save()
		.then(user => {
			console.log(user);
			res.status(201).json(user);
		})
		.catch(error=> console.log("this is the error=>", error));
};

//USER LOGIN

module.exports.doLogin = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw createError(400, "missing credentials");
	}
	console.log(req.body)


	User.findOne({ email: email })
		.populate("folders")
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

//USER LOGOUT

module.exports.logout = (req, res, next) => {
	req.session.destroy();
	res.status(204).json();
};

// USER DETAILS

module.exports.showDetails = (req, res, next) => {
	console.log("details");
	User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(error => console.log(error));
};

// EDIT USER

module.exports.editUser = (req, res, next) => {
	const {
		name,
		email,
		password,
		profilePic,
		organization,
		collaborators,
		interests,
		filters,
	} = req.body;
	userModel = {
		name,
		email,
		password,
		profilePic: req.file ? req.file.url : null,
		organization,
		collaborators,
		interests,
		filters,
	};
	console.log(userModel);
	User.findByIdAndUpdate(req.params.id, userModel, { new: true })
		.then(user => {
			console.log(user);
			res.json(user);
		})
		.catch(error => next(error));
};

// DELETE USER

module.exports.deleteUser = (req, res, next) => {
	User.deleteOne(req.params._id)
		.then(user => console.log(`User named ${user.name} has been deleted`))
		.catch(error => console.log(error));
};
