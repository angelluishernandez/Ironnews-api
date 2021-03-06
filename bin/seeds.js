require("../config/db.config");

const mongoose = require("mongoose");
const User = require("../models/user.model");
const Folder = require("../models/folder.model");
const News = require("../models/news.model");

const faker = require("faker");
const usersId = [];
const foldersId = [];

Promise.all([User.deleteMany(), News.deleteMany()])
	.then(() => {
		for (let i = 0; i < 20; i++) {
			const users = new User({
				name: faker.name.firstName(),
				email: faker.internet.email(),
				password: 123123123,
				profilePic: faker.image.avatar(),
				organization: faker.company.companyName(),
				collaborators: faker.name.firstName(),
				categories: "business",
				customCategories: ["trump", "coronavirus"],
				filters: "a filter",
			});

			users
				.save()
				.then(user => {
					console.log(user.name + user.email);
					usersId.push(user._id);

					for (let j = 0; j < 3; j++) {
						const folders = new Folder({
							user: user._id,
							name: faker.internet.name(),
							description: faker.lorem.paragraph(),
							tags: "some tag",
						});
						folders
							.save()
							.then(folder => {
								console.log(folder.user);
								foldersId.push(folder._id);
								for (let z = 0; z < 10; z++) {
									const news = new News({
										user: folder.user,
										folder: folder._id,
										source_name: faker.name.firstName(),
										headline: faker.lorem.sentence(),
										url: faker.internet.url(),
										image: faker.internet.avatar(),
										date: faker.date.past(),
										isInFolder: false,
										tags: "some tag",
										readed: false,
										notes: faker.lorem.paragraph(),
									});
									news
										.save()
										.then(news => {
											console.log(news.headline);
										})
										.catch(error => console.log(error));
								}
							})
							.catch(error => console.log(error));
					}
				})
				.catch(error => console.log(error));
		}
	})
	.catch(error => console.log(error));
