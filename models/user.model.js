const mongoose = require("mongoose");
const InterestsList = require("../constants/interests");
const bcrypt = require("bcrypt");
require("./news.model");
require("./folder.model");

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;
const max_categories = 10;
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			lowercase: true,
			match: [EMAIL_PATTERN, "Email is required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [8, "Password must be at least 8 characters long"],
		},
		profilePic: {
			type: String,
		},

		// Another model for organizations should be included later on
		organization: {
			type: String,
			required: true,
		},
		// Another model for organizations should be included later on

		collaborators: {
			type: String,
		},
		categories: {
			type: [String],
			enum: InterestsList,
		},
		customCategories: [
			{
				type: String,
				validate: {
					validator: () => this.customCategories.length <= 50,
				},
				message: "You have too many categories. Please delete some",
			},
		],
		folders: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Folders",
		},
		saved_news: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "News",
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", function(next) {
	const user = this;
	if (user.isModified("password")) {
		bcrypt
			.genSalt(SALT_WORK_FACTOR)
			.then(salt => {
				return bcrypt.hash(user.password, salt).then(hash => {
					user.password = hash;
					next();
				});
			})
			.catch(error => next(error));
	} else {
		next();
	}
});

userSchema.methods.checkPassword = function(password) {
	return bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
