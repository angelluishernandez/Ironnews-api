const express = require("express");
const router = express.Router();
const sourcesController = require("../controllers/sources.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/cloudinary.config");
const fetch = require("node-fetch");

router.post("/sources/get-sources", sourcesController.getSources);
router.get("/sources/:userId", sourcesController.listUserSources);
router.post("/sources/:userId/addsources", sourcesController.addSourcesToUser);
router.post("/sources/:userId/:sourceId", sourcesController.getSourceNews)

module.exports = router;
