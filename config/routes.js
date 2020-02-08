const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require("../controllers/user.controller")
const newsController = require("../controllers/news.controller")
const authMiddleware = require("../middlewares/auth.middleware")


router.get('/', controller.base);
router.post("/register", authMiddleware.isNotAuthenticated, userController.create )






module.exports = router;