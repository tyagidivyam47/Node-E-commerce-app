const express = require("express");

const authController = require("../controllers/auth");

const route = express.Router();

route.get("/login", authController.getLogin);

module.exports = route;
