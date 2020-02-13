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
router.get("/users", userController.getUsers)



router.post("/login", authMiddleware.isNotAuthenticated, userController.doLogin)
router.post("/logout", authMiddleware.isAuthenticated, userController.logout)
router.post("/register", upload.single("profilePic"), authMiddleware.isNotAuthenticated, userController.create)
router.get("/news/top-headlines", authMiddleware.isAuthenticated, newsAPIController.getTopHeadlines)
router.get("/news/everything", authMiddleware.isAuthenticated, newsAPIController.everything)
router.get("/folders/:id", authMiddleware.isAuthenticated, foldersController.listFolders)

router.get("/user/:id", authMiddleware.isAuthenticated, userController.showDetails)
router.patch("/user/:id", upload.single("profilePic"), authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, userController.editUser)
router.delete("/user/:id", authMiddleware.isAuthenticated, userController.deleteUser)


router.get("/news/:id", authMiddleware.isAuthenticated, newsController.listNews)
router.get("/news/:id/:newsId", authMiddleware.isAuthenticated, newsController.newsDetails)
router.patch("/news/:id/:newsId", authMiddleware.isAuthenticated, newsController.editNews)

router.post("/folders/:id/newfolder", upload.single("profilePic"), authMiddleware.isAuthenticated, foldersController.addFolder)
router.get("/folders/:id/:folderId", authMiddleware.isAuthenticated, foldersController.folderDetail)
router.patch("/folders/:id/:folderId", authMiddleware.isAuthenticated, foldersController.updateFolder)
router.delete("/folders/:id/:folderId/deletefolder", authMiddleware.isAuthenticated, foldersController.deleteFolder)






module.exports = router;