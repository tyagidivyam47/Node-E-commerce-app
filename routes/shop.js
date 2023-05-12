const express = require("express");
// const path = require("path");

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

// const adminData = require("./admin");
// const rootDir = require("../util/path");
const route = express.Router();

route.get("/", shopController.getIndex);

route.get("/products", shopController.getProducts);

route.get("/products/:productId", shopController.getProductDetail);

route.get("/cart", isAuth, shopController.getCart);

route.post("/cart", isAuth, shopController.postCart);

// route.get("/orders", isAuth, shopController.getOrders);

route.get("/checkout", isAuth, shopController.getCheckout);

route.get("checkout/success", isAuth, shopController.getCheckoutSuccess);

route.get("checkout/cancel", isAuth, shopController.getCheckout);

route.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

route.get("/orders/:orderId", isAuth, shopController.getInvoice)

module.exports = route;
