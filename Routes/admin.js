// const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

// const rootDir = require("../util/path");

const route = express.Router();

// /admin/add-product => GET

route.get("/admin/add-product", adminController.getAddProducts);

route.get("/admin/products", adminController.getProducts);

// // /admin/add-product => POST
route.post("/add-product", adminController.postAddProducts);

route.get("/edit-product/:productId", adminController.getEditProduct);

route.post("/edit-product", adminController.postEditProducts );

route.post("/delete-product", adminController.postDeleteProduct );

module.exports = route;
