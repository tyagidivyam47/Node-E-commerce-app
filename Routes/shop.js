const express = require("express");
// const path = require("path");

const shopController = require("../controllers/shop");

// const adminData = require("./admin");
// const rootDir = require("../util/path");
const route = express.Router();

route.get("/", shopController.getIndex);

route.get("/products", shopController.getProducts);

route.get("/products/:productId", shopController.getProductDetail);

route.get("/cart", shopController.getCart);

route.post("/cart", shopController.postCart);

route.get("/orders", shopController.getOrders);

// // route.get("/checkout", shopController.getCheckout);

route.post("/cart-delete-item", shopController.postCartDeleteProduct);

route.post("/create-order", shopController.postOrder);

module.exports = route;
