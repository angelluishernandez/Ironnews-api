const express = require("express");
const router = express.Router();
const foldersController = require("../controllers/folders.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/cloudinary.config");
const fetch = require("node-fetch");

router.get(
	"/folders/:id",
	authMiddleware.isAuthenticated,
	authMiddleware.isCurrentUser,
	foldersController.listFolders
);
router.get(
	"/folders/:id/:folderId",
	authMiddleware.isAuthenticated,
	authMiddleware.isCurrentUser,
	foldersController.folderDetails
);
router.post(
	"/folders/:id/newfolder",
	authMiddleware.isAuthenticated,
	authMiddleware.isCurrentUser,
	foldersController.addFolder
);
router.patch(
	"/folders/:id/:folderId",
	authMiddleware.isAuthenticated,
	authMiddleware.isCurrentUser,
	foldersController.updateFolder
);
router.delete(
	"/folders/:id/:folderId/deletefolder",
	authMiddleware.isAuthenticated,
	foldersController.deleteFolder
);

module.exports = router;
