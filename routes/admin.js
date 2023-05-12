// const path = require("path");

const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

// const rootDir = require("../util/path");

const route = express.Router();

// /admin/add-product => GET

route.get("/add-product", isAuth, adminController.getAddProducts);

route.get("/admin/products", isAuth, adminController.getProducts);

// // /admin/add-product => POST
route.post("/add-product", [
    body('title').trim(),
    body('imageUrl').trim(),
    body('description').trim()
], isAuth, adminController.postAddProducts);

route.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

route.post("/edit-product", [
    body('title').trim(),
    body('imageUrl').trim(),
    body('description').trim()], isAuth, adminController.postEditProducts);

    // This was used without using server side js
// route.post("/delete-product", isAuth, adminController.postDeleteProduct);

route.delete("/admin/product/:productId", isAuth, adminController.deleteProduct);

module.exports = route;
