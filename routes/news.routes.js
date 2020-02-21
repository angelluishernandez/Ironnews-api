const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const newsController = require("../controllers/news.controller")
const newsAPIController = require("../controllers/newsApi.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("../config/cloudinary.config")
const fetch = require("node-fetch")


router.post("/news/top-headlines", authMiddleware.isAuthenticated, newsAPIController.getTopHeadlines)
router.get("/news/everything", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsAPIController.everything)
router.get("/news/:id", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsController.listNews)
router.get("/news/:id/my-headlines", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsAPIController.getCustomCategoriesNews)
router.post("/news/:id/add-news", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsController.addNews)
router.get("/news/:id/:newsId", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsController.newsDetails)
router.patch("/news/:id/:newsId", authMiddleware.isAuthenticated,  authMiddleware.isCurrentUser, newsController.editNews)
router.delete("/news/:id/:newsId", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsController.deleteNews)
router.post("/news/:id/:newsId/add-to-folder", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsController.addNewsToFolder)
module.exports = router