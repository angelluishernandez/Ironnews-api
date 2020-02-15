const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require("../controllers/user.controller")
const newsController = require("../controllers/news.controller")
const newsAPIController = require("../controllers/newsApi.controller")
const foldersController = require("../controllers/folders.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("./cloudinary.config")
const fetch = require("node-fetch")


router.get('/', controller.base);

module.exports = router;