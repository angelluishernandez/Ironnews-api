const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require("../controllers/user.controller")
const newsController = require("../controllers/news.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("./cloudinary.config")

// USER ROUTES

router.get('/', controller.base);
router.get("/users", userController.getUsers)
router.post("/register", upload.single("profilePic"), authMiddleware.isNotAuthenticated, userController.create)
router.post("/login", authMiddleware.isNotAuthenticated, userController.doLogin)
router.post("/logout", authMiddleware.isAuthenticated, userController.logout)

router.get("/user/:id", authMiddleware.isAuthenticated, userController.showDetails)
router.patch("/user/:id", upload.single("profilePic"), authMiddleware.isAuthenticated, userController.editUser)
router.delete("/user/:id", authMiddleware.isAuthenticated, userController.deleteUser)

// NEWS ROUTES

router.get("/:id/news", authMiddleware.isAuthenticated, newsController.listNews)






module.exports = router;