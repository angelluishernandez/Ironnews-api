const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require("../controllers/user.controller")
const newsController = require("../controllers/news.controller")
const foldersController = require("../controllers/folders.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("./cloudinary.config")

// USER ROUTES

router.get('/', controller.base);
router.get("/users", userController.getUsers)



router.post("/register", upload.single("profilePic"), authMiddleware.isNotAuthenticated, userController.create)
router.post("/login", authMiddleware.isNotAuthenticated, userController.doLogin)
router.post("/logout", authMiddleware.isAuthenticated, userController.logout)
router.get("/folders/:id", authMiddleware.isAuthenticated, foldersController.listFolders)

router.get("/user/:id", authMiddleware.isAuthenticated, userController.showDetails)
router.patch("/user/:id", upload.single("profilePic"), authMiddleware.isAuthenticated, userController.editUser)
router.delete("/user/:id", authMiddleware.isAuthenticated, userController.deleteUser)


router.get("/news/:id", authMiddleware.isAuthenticated, newsController.listNews)
router.post("/folders/:id/newfolder", upload.single("profilePic"), foldersController.addFolder)






module.exports = router;