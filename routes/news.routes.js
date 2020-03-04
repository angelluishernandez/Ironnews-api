const express = require("express");
const router = express.Router();
const controller = require("../controllers/base.controller");
const newsController = require("../controllers/news.controller");
const newsAPIController = require("../controllers/newsApi.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/cloudinary.config");
const fetch = require("node-fetch");

router.post("/", authMiddleware.isAuthenticated, newsAPIController.landing);
router.post(
	"/news/top-headlines",
	authMiddleware.isAuthenticated,
	newsAPIController.getTopHeadlines
);
router.post(
	"/news/everything",
	authMiddleware.isAuthenticated,
	newsAPIController.getEverything
);
router.get(
	"/news/:id",
	authMiddleware.isAuthenticated,
	authMiddleware.isCurrentUser,
	newsController.listNewsAll
);
router.post(
	"/news/:folderId/",
	authMiddleware.isAuthenticated,
	newsController.addNewsToFolder
);
router.get(
	"/folder/:folderId/newslist",
	authMiddleware.isAuthenticated,
	newsController.listNews
);
router.post(
	"/news/:id/add-news",
	authMiddleware.isAuthenticated,
	authMiddleware.isCurrentUser,
	newsController.addNews
);
router.get(
	"/news/:id/:newsId",
	authMiddleware.isAuthenticated,
	authMiddleware.isCurrentUser,
	newsController.newsDetails
);
router.patch(
	"/news/:id/:newsId",
	authMiddleware.isAuthenticated,
	authMiddleware.isCurrentUser,
	newsController.editNews
);
router.delete(
	"/news/:id/:newsId",
	authMiddleware.isAuthenticated,
	authMiddleware.isCurrentUser,
	newsController.deleteNews
);

module.exports = router;
