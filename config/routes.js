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
router.get("/news/everything", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsAPIController.everything)
router.get("/news/:id/my-headlines", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsAPIController.getCustomCategoriesNews)
router.get("/folders/:id", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, foldersController.listFolders)

router.get("/user/:id", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, userController.showDetails)
router.patch("/user/:id", upload.single("profilePic"), authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, userController.editUser)
router.delete("/user/:id", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, userController.deleteUser)


router.get("/news/:id", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsController.listNews)
router.get("/news/:id/:newsId", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsController.newsDetails)
router.patch("/news/:id/:newsId", authMiddleware.isAuthenticated,  authMiddleware.isCurrentUser, newsController.editNews)
router.delete("/news/:id/:newsId", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsController.deleteNews)
router.post("/news/:id/:newsId/add-to-folder", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, newsController.addNewsToFolder)


router.post("/folders/:id/newfolder", upload.single("profilePic"), authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, foldersController.addFolder)
router.get("/folders/:id/:folderId", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, foldersController.folderDetail)
router.patch("/folders/:id/:folderId", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, foldersController.updateFolder)
router.delete("/folders/:id/:folderId/deletefolder", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, foldersController.deleteFolder)






module.exports = router;