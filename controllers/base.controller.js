const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require("../models/user.model")

module.exports.base = (req, res, next) => {
    User.find({user: currentUser})

    res.json({});
};