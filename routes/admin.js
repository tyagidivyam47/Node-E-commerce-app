// const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth")

// const rootDir = require("../util/path");

const route = express.Router();

// /admin/add-product => GET

route.get("/add-product", isAuth, adminController.getAddProducts);

route.get("/admin/products", isAuth, adminController.getProducts);

// // /admin/add-product => POST
route.post("/add-product", isAuth, adminController.postAddProducts);

route.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

route.post("/edit-product", isAuth, adminController.postEditProducts );

route.post("/delete-product", isAuth, adminController.postDeleteProduct );

module.exports = route;
