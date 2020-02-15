const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("../config/cloudinary.config")
const fetch = require("node-fetch")

router.get("/users", userController.getUsers)
router.post("/login", authMiddleware.isNotAuthenticated, userController.doLogin)
router.post("/logout", authMiddleware.isAuthenticated, userController.logout)
router.post("/register", upload.single("profilePic"), authMiddleware.isNotAuthenticated, userController.create)
router.get("/user/:id", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, userController.showDetails)
router.patch("/user/:id", upload.single("profilePic"), authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, userController.editUser)
router.delete("/user/:id", authMiddleware.isAuthenticated, authMiddleware.isCurrentUser, userController.deleteUser)

module.exports = router