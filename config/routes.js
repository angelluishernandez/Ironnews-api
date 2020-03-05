const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

const authMiddleware = require("../middlewares/auth.middleware")



router.get('/', authMiddleware.isAuthenticated, controller.base);

module.exports = router;